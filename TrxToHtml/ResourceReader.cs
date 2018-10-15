using System;
using System.IO;

namespace TrxerConsole
{
    internal class ResourceReader
    {
        internal static string LoadTextFromResource(string name)
        {
            string result = string.Empty;
            using (StreamReader sr = new StreamReader(
                StreamFromResource(name)))
            {
                result = sr.ReadToEnd();
            }
            return result;
        }

        internal static Stream StreamFromResource(string name)
        {
            return new FileStream(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, name), FileMode.Open);
        }
    }
}
