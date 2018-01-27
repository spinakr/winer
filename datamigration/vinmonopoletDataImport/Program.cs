using System;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using CsvHelper;
using Dapper;
using domain;

namespace vinmonopoletDataImport
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var db = new SqlConnection(@"Server=localhost;Database=winer;User Id=SA; Password=Qwer1234*;"))
            using(var textReader = new StreamReader("./produkter.csv", Encoding.GetEncoding("iso-8859-1")))
            {
                // Console.WriteLine(textReader.ReadLine());
                var csv = new CsvReader( textReader );
                csv.Configuration.Delimiter = ";";
                csv.Configuration.RegisterClassMap<CsvClassMap>();
                csv.Configuration.HeaderValidated = null;

                var products = csv.GetRecords<VinmonopoletWine>();

                foreach(var product in products)
                {
                    db.Insert(product);
                }
            }
        }
    }
}
