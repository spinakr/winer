using System;
using System.Linq;
using System.Reflection;
using DbUp;

namespace database
{
    public class Program
    {
        static int Main(string[] args)
        {
            Console.WriteLine(args.FirstOrDefault());
            var connectionString =
                args.FirstOrDefault()
                ?? @"Server=localhost,1401;Database=winer;User Id=SA; Password=Qwer1234*";

            EnsureDatabase.For.SqlDatabase(connectionString);

            var upgrader =
                DeployChanges.To
                    .SqlDatabase(connectionString)
                    .WithScriptsEmbeddedInAssembly(Assembly.GetExecutingAssembly())
                    .LogToConsole()
                    .Build();

            var result = upgrader.PerformUpgrade();

            if (!result.Successful)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine(result.Error);
                Console.ResetColor();
#if DEBUG
                Console.ReadLine();
#endif
                return -1;
            }

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Success!");
            Console.ResetColor();
            return 0;
        }
    }
}
