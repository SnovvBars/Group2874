// Задача 50. Напишите программу, которая на вход принимает число, 
// и возвращает индексы этого элемента или же указание, что такого элемента нет.

// Например, задан массив:
// 1 4 7 2
// 5 9 2 3
// 8 4 2 4

// 17 -> такого числа в массиве нет

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

void FindNumber (int numFind, int[,] matrix)                   // Поиск совпадений с numFind
{
    int count = 0;
    for (int i = 0; i < matrix.GetLength(0); i++)
    {
        for (int j = 0; j < matrix.GetLength(1); j++)
        {
            if (matrix[i, j] == numFind)                        // Если совпало, вводим строку и столбец
            {
                Console.WriteLine($"\nИскомое число найдено в {i+1} строке, {j+1} столбец");
                count++;                                        // Счетчик совпадений
            }
        }
    }
    if (count == 0) Console.WriteLine("\nСовпадений не найдено!");  // Дальше тонкости падежа )))
    else if (count == 1) Console.WriteLine($"Найдено {count} совпадение");
    else if ((count == 2) || (count == 3) || (count == 4)) Console.WriteLine($"Найдено {count} совпадения");    
    else Console.WriteLine($"Найдено {count} совпадений");
    Console.WriteLine("");
    return;
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

Console.WriteLine("");

Console.WriteLine("Что ищем?");
int num = int.Parse(Console.ReadLine());                                    // Запрашиваем искомое число

FindNumber(num, intMatrix);                                                 // Ищем его
