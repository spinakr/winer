using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Globalization;
using Dapper;
using domain;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;

namespace azuremigration
{
    class Program
    {
        static void Main(string[] args)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=furiouskangaroo;AccountKey=fkMRtUfi8DD5QKiux+8xVIZRJNzWPI4jh48lqHVQonT7DFsA1/XPxqrdjjElZxLRuUdAgmfKecZF9cI1Z5kVXA==;EndpointSuffix=core.windows.net");
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
            CloudTable table = tableClient.GetTableReference("wines");

            var query = new TableQuery<WineInfo>()
                .Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "IngridAnders"));
            TableContinuationToken continuationToken = null;

            var result = table.ExecuteQuerySegmentedAsync(query, continuationToken).Result;

            using (var db = new SqlConnection(@"Server=localhost,1433;Database=winer;User Id=SA; Password=Qwer1234*;"))
            {
                foreach (var wine in result)
                {
                    var dbWine = new Wine
                    {
                        Name = wine.Name,
                        VinmonopoletId = wine.VinmonopoletId,
                        Producer = wine.Producer,
                        Area = wine.Area,
                        Status = ParseStatus(wine.Status),
                        Price = double.Parse(wine.Price.Split(',')[0]),
                        Country = wine.Country,
                        VinmonopoletUrl = wine.VinmonopoletUrl,
                        Vintage = wine.Vintage,
                        Type = wine.Type,
                        Fruit = wine.Fruit,
                        Storage = wine.Storage,
                        BoughtDate = ParseDateTimeString(wine.BoughtDate)
                    };
                    var dbWineId = db.Insert(dbWine);

                    if (wine.Status == "archive")
                    {
                        var tastingNote = new TastingNote
                        {
                            WineId = dbWineId.Value,
                            Note = wine.Note,
                            Occation = wine.Occation,
                            ConsumptionDate = wine.Timestamp.DateTime
                        };
                        db.Insert(tastingNote);
                    }

                }
            }

            DateTime? ParseDateTimeString(string date)
            {
                var dateToParse = date.Split(' ')[0];
                DateTime parsedDate;
                if (DateTime.TryParseExact(dateToParse, "M/d/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate))
                    return parsedDate;
                return null;
            }

            int ParseStatus(string status)
            {
                switch (status)
                {
                    case "instock":
                        return 1;
                    case "archive":
                        return 2;
                    case "shoppinglist":
                        return 3;
                    default:
                        return -99;
                }
            }
        }
    }
}
