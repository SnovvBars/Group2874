// Задача 47. Задайте двумерный массив размером m×n, заполненный случайными вещественными числами.
// m = 3, n = 4.

// 0,5 7 -2 -0,2
// 1 -3,3 8 -9,9
// 8 7,8 -7,1 9

// МЕТОДЫ
double[,] FillMatrix(int rows, int cols, int min, int max)              // Заполняем массив (метод)
{
    double[,] tmpMatrix = new double[rows, cols];                       // Создаем временной массив
    int intRnd = 1;
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < cols; j++)
        {
            intRnd = new Random().Next(min, max + 1);                   // Генерируем целое вещественное число в заданном диапазоне
            tmpMatrix[i, j] = new Random().NextDouble() * intRnd;       
        }
    }
    return tmpMatrix;
}

void PrintMatrix(double[,] matrix)              // Печатаем массив
{    
    Console.Clear();
    Console.WriteLine($"\nМатрица {matrix.GetLength(0)}x{matrix.GetLength(1)}:\n");
    for (int i = 0; i < matrix.GetLength(0); i++)
    {
        for (int j = 0; j < matrix.GetLength(1); j++)
        {
            Console.Write("{0, 6:f2} | ", matrix[i, j]);        // Форматируем вывод по шаблону |  24,11 |  18,57 |  34,11 |  76,51 |
        }
        Console.WriteLine("");
    }
}

// ТЕЛО ПРОГРАММЫ
Console.WriteLine("Введите количество строк");
int rowsMtrx = int.Parse(Console.ReadLine());

Console.WriteLine("Введите количество столбцов");
int colsMtrx = int.Parse(Console.ReadLine()); 

int minInterval = -100;                                                             // Минимальный интервал выводимых чисел
int maxInterval = 100;                                                              // Максимальный интервал выводимых чисел

double[,] rndMatrix = FillMatrix(rowsMtrx, colsMtrx, minInterval, maxInterval);     // Создаем массив
PrintMatrix(rndMatrix);                                                             // Выводим на печать
Console.WriteLine("");                                                              // Просто пустая строка
