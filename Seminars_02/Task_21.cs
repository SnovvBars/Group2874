// Задача 21
// Напишите программу, которая принимает на вход координаты двух точек 
// и находит расстояние между ними в 3D пространстве.
// A (3,6,8); B (2,1,-7), -> 15.84
// A (7,-5, 0); B (1,-1,9) -> 11.53

double segmentLength(double A1, double A2, double A3, double B1, double B2, double B3)
{
    double result = Math.Sqrt((B1 - A1)*(B1 - A1) +  (B2 - A2)*(B2 - A2) + (B3 - A3)*(B3 - A3));
    return result;
}

Console.WriteLine("Введите координаты по х точки А:");
int AX = int.Parse(Console.ReadLine());
Console.WriteLine("Введите координаты по y точки А:");
int AY = int.Parse(Console.ReadLine());
Console.WriteLine("Введите координаты по z точки А:");
int AZ = int.Parse(Console.ReadLine());

Console.WriteLine("Введите координаты по х точки B:");
int BX = int.Parse(Console.ReadLine());
Console.WriteLine("Введите координаты по y точки B:");
int BY = int.Parse(Console.ReadLine());
Console.WriteLine("Введите координаты по z точки B:");
int BZ = int.Parse(Console.ReadLine());

Console.WriteLine("Длина отрезка равна: " + segmentLength(AX, AY, AZ, BX, BY, BZ));
