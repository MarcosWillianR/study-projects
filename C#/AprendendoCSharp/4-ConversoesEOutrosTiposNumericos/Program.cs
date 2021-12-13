using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4_ConversoesEOutrosTiposNumericos
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Executando o projeto 4");

            double salario = 1200.50;

            int salarioEmInteiro = (int)salario; // casting -> conversão de um tipo para outro explicitamente

            Console.WriteLine(salarioEmInteiro);

            long idadeUniverso = 13000000000;
            short quantidadeProdutos = 150;
            float altura = 1.80f;

            Console.WriteLine($"long idadeUniverso: {idadeUniverso}; short quantidadeProdutos: {quantidadeProdutos}; float altura: {altura}");

            Console.ReadLine();
        }
    }
}
