// Задача 52. Задайте двумерный массив из целых чисел. 
// Найдите среднее арифметическое элементов в каждом столбце.

// Например, задан массив:
// 1 4 7 2
// 5 9 2 3
// 8 4 2 4
// Среднее арифметическое каждого столбца: 4,6; 5,6; 3,6; 3

// МЕТОДЫ
int[,] FillMatrix(int rows, int cols, int min, int max)          // Заполняем матрицу
{
    int[,] tmpMatrix = new int[rows, cols];
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < cols; j++)
        {
            tmpMatrix[i, j] = new Random().Next(min, max+1);
        }
    }
    return tmpMatrix;
}

void PrintMatrix(int[,] matrix)                                 // Печатаем матрицу
{    
    Console.Clear();
    Console.WriteLine($"\nМатрица {matrix.GetLength(0)}x{matrix.GetLength(1)}:\n"); // Просто инфо о размерности матрицы
    for (int i = 0; i < matrix.GetLength(0); i++)
    {
        for (int j = 0; j < matrix.GetLength(1); j++)
        {
            Console.Write("{0, 3} |  ", matrix[i, j]);        // Форматируем вывод по шаблону |  24 |  18 |  34 |  76 |
        }
        Console.WriteLine("");
    }
}

void MediumCols(int[,] matrix)                      // Вычисление среднего значения
{
    Console.WriteLine("");                         
    int cols = matrix.GetLength(1);                 // Количество столбцов
    int rows = matrix.GetLength(0);                 // Кол во строк
    int summCols = 0;
    for (int j = 0; j < cols; j++)                  // Проходим по столбцам
    {
        for (int i = 0; i < rows; i++)
        {
            summCols = summCols + matrix[i, j];     // Суммируем значение в одном столбце
        }
        Console.WriteLine($"Среднее значение {j+1} колонки равно {(double)summCols / rows:f1}");
        summCols = 0;                               // Обнуляем сумму для следующего столбца
    }
    Console.WriteLine("");                          // Отбивка
}

// ТЕЛО ПРОГРАММЫ
Console.WriteLine("Введите количество строк:");                             // Запрашиваем количество строк
int rowsMtrx = int.Parse(Console.ReadLine());

Console.WriteLine("Введите количество солбцов:");                           // Запрашиваем количество столбцов
int colsMtrx = int.Parse(Console.ReadLine());

int minInterval = -100;                                                     // Интервал значений матрицы
int maxInterval = 100;

int[,] intMatrix = FillMatrix(rowsMtrx, colsMtrx, minInterval, maxInterval);// Заполняем матрицу значениями
PrintMatrix(intMatrix);                                                     // Печатаем её

MediumCols(intMatrix);                                                      // Находим и выводим среднее значение столбцов
