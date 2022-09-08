// Задайте прямоугольный двумерный массив. 
// Напишите программу, которая будет находить строку с наименьшей суммой элементов.
// Например, задан массив:

// 1 4 7 2
// 5 9 2 3
// 8 4 2 4
// 5 2 6 7

// Программа считает сумму элементов в каждой строке и выдаёт номер строки с наименьшей суммой элементов: 1 строка

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
// 
void PrintMatrix(int[,] matrix)                                 // Печатаем матрицу
{    
    Console.WriteLine($"матрица {matrix.GetLength(0)}x{matrix.GetLength(1)}:"); // Просто инфо о размерности матрицы
    for (int i = 0; i < matrix.GetLength(0); i++)
    {
        for (int j = 0; j < matrix.GetLength(1); j++)
        {
            Console.Write("{0, 4} |  ", matrix[i, j]);        // Форматируем вывод по шаблону |  24 |  18 |  34 |  76 |
        }
        Console.WriteLine("");
    }
}
// 
int calcSum(int[,] matrix, int i)
{
    int sum = 0;
    for (int j = 0; j < matrix.GetLength(1); j++)
    {
        sum = sum + matrix[i, j];
    }
    return sum;
}


// ТЕЛО ПРОГРАММЫ
Console.WriteLine("Введите количество строк:");                             // Запрашиваем количество строк
int rowsMtrx = int.Parse(Console.ReadLine());
Console.WriteLine("Введите количество солбцов:");                           // Запрашиваем количество столбцов
int colsMtrx = int.Parse(Console.ReadLine());

int minInterval = 0;                                                     // Интервал значений матрицы
int maxInterval = 10;

int[,] intMatrix = FillMatrix(rowsMtrx, colsMtrx, minInterval, maxInterval);    // Заполняем матрицу значениями
Console.WriteLine("");                                              // Всякие красивости вывода
PrintMatrix(intMatrix); 

Console.WriteLine("");  

int findRow = minInterval;                                  // Начинаем со строки минимального значения заданного интервала (см выше)
for (int i = 1; i < intMatrix.GetLength(0); i++)            // проходим по всем строкам
{
    Console.WriteLine(i +" Текущая строка: " + findRow);    
    int currentSum = calcSum(intMatrix, i);
    Console.WriteLine("  Текущяя сумма: " + currentSum);
    int prevSum = calcSum(intMatrix, i - 1);
    Console.WriteLine("  Предыдущая: " + prevSum  + "\n");
    if (calcSum(intMatrix, i) < calcSum(intMatrix, i - 1)) findRow = i;     // сравниваем текущу сумму сqw
}
Console.WriteLine("Искомая строка: " + findRow + "\n");
