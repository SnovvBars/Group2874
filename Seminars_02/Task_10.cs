// Задача 10: Напишите программу, которая принимает на вход трёхзначное число и на выходе показывает вторую цифру этого числа.
// 456 -> 5 
// 782 -> 8
// 918 -> 1

Console.Write("Введите число: ");

// 1. Вариант через математические вычисления
int number = Convert.ToInt32(                   // Конвертировали в целое число
    Math.Abs(                                   // Взяли модуль
        Math.Truncate(                          // Отбросили дробную часть
            double.Parse(Console.ReadLine()     // Ввели число с клавиатуры, преобразовали формат 
            )
        )
    )
);

// Можно вводить дробные и отрицательные числа

if (number >= 100 && number < 1000) Console.WriteLine("Вторая цифра равна: " + (number%100)/10);  // в остатке от деления на 100 нашли количество десятков
else Console.WriteLine("Введено неправильное число, попробуйте снова.");
// Конец 1го варианта 

/*
// 2. Вариант через массив букв строки

double number = Math.Abs(Math.Truncate(double.Parse(Console.ReadLine())));

if (number >= 100 && number < 1000)
{ 
    Console.WriteLine("Вторая цифра равна: " + Convert.ToString(number)[1]);
}
else Console.WriteLine("Введено неправильное число, попробуйте снова.");
*/
