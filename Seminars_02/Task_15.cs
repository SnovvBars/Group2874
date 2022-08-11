// Задача 15: Напишите программу, которая принимает на вход цифру, обозначающую день недели, и проверяет, является ли этот день выходным.
// 6 -> да
// 7 -> да
// 1 -> нет

Console.Write("Введите число от 1 до 7: ");



// Можно вводить дробные и отрицательные числа
int number = Convert.ToInt32(Math.Truncate(double.Parse(Console.ReadLine())));

// 1. Вариант через if
/*if (number >= 1 && number < 8)
{ 
    if (number == 6 || number == 7) Console.WriteLine("Выходной");
    else Console.WriteLine("Рабочий");
}
else Console.WriteLine("Введено неправильное число, попробуйте снова.");
// Конец 1го варианта 
*/

// 2. Вариант через переключатель

if (number >= 1 && number < 8)
{ 
  switch (number)
    {
        case (1): case(2):  case(3):  case(4):  case(5):
            Console.WriteLine("Рабочий");
            break;
        case (6):  case(7):
            Console.WriteLine("Выходной");
            break;
        default:
            Console.WriteLine("Ошибка ввода, сейчас произойдет самоуничтожение, отойдите на безопасное расстояние!");
            break;        
    }
}
else Console.WriteLine("Введено неправильное число, попробуйте снова.");
