// Задача 64: Задайте значения M и N. Напишите программу, 
// которая выведет все натуральные числа в промежутке от M до N.

// M = 1; N = 5. -> ""1, 2, 3, 4, 5""
// M = 4; N = 8. -> ""4, 6, 7, 8""

Console.WriteLine("Введите минимальное число M:"); // 
int m = int.Parse(Console.ReadLine());
Console.WriteLine("Введите максимальное число N:"); // 
int n = int.Parse(Console.ReadLine());

int NatureNum (int min, int max)
{
    if (max == min) 
    {
        Console.Write($"{min} ");
        return 0;
    }
    NatureNum(min, (max - 1));      // Рекурсия
    Console.Write($"{max} ");
    return 0;
}
// Тело программы
Console.WriteLine("");
NatureNum(m, n);            // Вызов процедуры
Console.WriteLine("\n");
