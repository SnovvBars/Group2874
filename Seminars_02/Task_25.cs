// Задача 25: Напишите цикл, который принимает на вход два числа (A и B)
// и возводит число A в натуральную степень B.
// 3, 5 -> 243 (3⁵)
// 2, 4 -> 16

double rank(double num, int rank)               // метод принимает 
{                                               // число и степень
    double result = num;
    for (int i = 1; i < rank; i++)
    {
        result = result*num;
    }
    return result;
}

Console.WriteLine("Введите число: ");           // вводим число
double num = double.Parse(Console.ReadLine());

Console.WriteLine("Введите степень: ");         // вводим степень
int numRank = int.Parse(Console.ReadLine());

Console.WriteLine("");
Console.WriteLine("Результат равен: " + rank(num, numRank));
