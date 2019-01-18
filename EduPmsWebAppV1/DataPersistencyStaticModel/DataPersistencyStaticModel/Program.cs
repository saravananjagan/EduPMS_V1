using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataPersistencyStaticModel
{
    public class Program
    {
        public static void Main(string[] args)
        {
            SetString(Console.ReadLine());
            PrintString();
            Console.ReadKey();
        }
        public static void SetString(string value)
        {
            DataModel.Name = value;
        }
        public static void PrintString()
        {
            Console.WriteLine(DataModel.Name);
        }
    }
}
