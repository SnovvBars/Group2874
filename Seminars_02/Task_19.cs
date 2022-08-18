// Задача 19
// Напишите программу, которая принимает на вход пятизначное число и проверяет, является ли оно палиндромом.
// 14212 -> нет
// 12821 -> да
// 23432 -> да

void checks(string num)
{
    if (num[0] != num[4] || num[1] != num[3]) 
        {
            Console.WriteLine("Введенное число не полиндром");
        }
    else Console.WriteLine("Введенное число полиндром");
    return;
} 

Console.WriteLine("Введите пятизначное число:");
string polindrom = Console.ReadLine();

checks(polindrom);
