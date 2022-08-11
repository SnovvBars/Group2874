// Задача 10: Напишите программу, которая принимает на вход трёхзначное число и на выходе показывает вторую цифру этого числа.
// 456 -> 5
// 782 -> 8
// 918 -> 1

// Перевод на международный формат представления дробных чисел
// System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo("en-US");

Console.WriteLine("Введите число: ");

// Можно вводить дробные, отрицательные числа
// -12489,589741  -> 4
// -57,5          -> Третьей цифры нет!

string numString = Convert.ToString(            // Конвертировали в строку
    Math.Abs(                                   // Взяли модуль
        Math.Truncate(                          // Отбросили дробную часть
            double.Parse(Console.ReadLine()     // Ввели число с клавиатуры, преобразовали формат 
            )
        )
    )
);

//  ^
//  |
// string numString = Convert.ToString(Math.Abs(Math.Truncate(double.Parse(Console.ReadLine()))));

if (numString.Length > 2) Console.WriteLine(numString[2]);
else Console.WriteLine("Третьей цифры нет!");
