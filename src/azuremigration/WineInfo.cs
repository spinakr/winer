using System;
using Microsoft.WindowsAzure.Storage.Table;

public class WineInfo : TableEntity
{
    public WineInfo() { }
    public WineInfo(string status, string id)
    {
        PartitionKey = status;
        RowKey = id;
    }

    public string Name { get; set; }
    public DateTime Timestamp { get; set; }
    public string VinmonopoletId { get; set; }
    public string Vintage { get; set; }
    public string Type { get; set; }
    public string Status { get; set; }
    public string Producer { get; set; }
    public string Country { get; set; }
    public string Area { get; set; }
    public string Fruit { get; set; }
    public string Price { get; set; }
    public string Occation { get; set; }
    public string Note { get; set; }
    public bool Storage { get; set; }
    public string BoughtDate { get; set; }
    public string VinmonopoletUrl { get; set; }
}