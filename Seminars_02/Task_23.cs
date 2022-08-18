// Задача 23
// Напишите программу, которая принимает на вход число (N) и выдаёт 
// таблицу кубов чисел от 1 до N.
// 3 -> 1, 8, 27
// 5 -> 1, 8, 27, 64, 125

double cube(double cubeOfNumber, double rate)
{
    return (Math.Pow(cubeOfNumber, rate)); 
}

Console.WriteLine("Введите число:");
int number = int.Parse(Console.ReadLine());
Console.WriteLine(""); 

for (int i = 1; i <= number; i++)
{
    Console.WriteLine(cube(i, 3));    
}
