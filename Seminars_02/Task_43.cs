// Задача 43: Напишите программу, которая найдёт точку пересечения двух прямых, заданных уравнениями 
// y = k1 * x + b1, 
// y = k2 * x + b2; 
// значения b1, k1, b2 и k2 задаются пользователем.

// b1 = 2, k1 = 5, b2 = 4, k2 = 9 -> (-0,5; -0,5)

// Методы
double[] CalcCross(double[,] arr)
{
    double[] xy = new double[2];                                            // Создали массив для X и Y
    if (arr[0,0] == arr[0,1])
    {
        Console.WriteLine("Прямые параллельны и не пересекаются.");
        return null;
    }
    xy[0] = (arr[1,1] - arr[1,0]) / (arr[0,0] - arr[0,1]);                  // x = (b2 - b1) / (k1 - k2)
    xy[1] = arr[0,0] * xy[0] + arr[1,0];                                    // y = k1 * x + b1
    return xy;
}

/* Вариант фиксированного значения
double[,] coord = new double[2,2] 
{
    {5, 9}, 
    {2, 4}
};
*/

// Тело программы
double[,] coord = new double[2,2];                                  // Матрица. Первая строка - K первой и второй прямой
                                                                    // Вторая строка - B первой и второй прямой
Console.WriteLine("\nВведите коэффициент перой прямой (K1):");      // Вводим значения
coord[0,0] = double.Parse(Console.ReadLine());

Console.WriteLine("\nВведите коэффициент второй прямой (K2):");
coord[0,1] = double.Parse(Console.ReadLine());

Console.WriteLine("\nВведите отклонение перой прямой (B1):");
coord[1,0] = double.Parse(Console.ReadLine());

Console.WriteLine("\nВведите отклонение второй прямой (B2):");
coord[1,1] = double.Parse(Console.ReadLine());

double[] coordPoint = CalcCross(coord);                             // Массив из значений X и Y
Console.WriteLine($"\nКоординаты пересечения прямых по x: {coordPoint[0]:f2}, по y: {coordPoint[1]:f2},\n");
