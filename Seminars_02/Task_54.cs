// Задача 54: Задайте двумерный массив. Напишите программу, 
// которая упорядочит по убыванию элементы каждой строки двумерного массива.
// Например, задан массив:
// 1 4 7 2
// 5 9 2 3
// 8 4 2 4

// В итоге получается вот такой массив:
// 7 4 2 1
// 9 5 3 2
// 8 4 4 2


/*
Алгоритм:
Запрашиваем параметры с клавиатуры.
Генерируем массив
Печатаем его
Передаем в функцию в метод сортировки
Метод:
Создает одномерный вспомогательный массив, равный числу элементов в строке
Построчно приравниваем его к значениям строк матрицы
Передаем одномерный массив рекурсивному методу сортировки одномерного массива 
Заменяем строку матрицы значениями полученного отсортированного массива
Переходим к следующей строке и так до конца матрицы
Печатаем Отсортированный массив
*/

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

// void PrintArray(int[] lineArray)                             // Метод выводит на печать одномерный массив 
// {
//     // Console.WriteLine("\nСтарая строка\n");               // Был нужен для проверки сортировки строки
//     for (int i = 0; i < lineArray.Length; i++)
//     {
//         Console.Write("{0, 3} |  ", lineArray[i]);         
//     }
// }

int[,] SortMatrixRows(int[,] matrix)                            // Метод построчно передаем эленты строк в метод сортировки 
{
    int[] rowMatrix = new int[matrix.GetLength(1)];             // одномерных массивов
    for (int i = 0; i < matrix.GetLength(0); i++)               // для каждой строки
    {
        for (int j = 0; j < matrix.GetLength(1); j++)           // Записываем строку в массив rowMatrix
        {
            rowMatrix[j] = matrix[i, j];
        }
    
    rowMatrix = SortRow(rowMatrix);                             // Передаем массив на сортировку                                 
    
        for (int j = 0; j < matrix.GetLength(1); j++)           // Обратно записываем отсортированную строку в матрицу
        {
            matrix[i, j] = rowMatrix[j];
        }
    }
    return matrix;                                              // Возвращаем массив отсортированный построчно
}

int[] SortRow(int[] arrStr)                                     // Рекурсивный метод сортировки одномерного массива
{
    for (int i = 0; i < arrStr.Length - 1; i++)
    {
        if (arrStr[i] < arrStr[i + 1])                          // Если текущий элемент меньше следующего...
        {                                                       // меняем местами
            arrStr[i] += arrStr[i + 1];
            arrStr[i + 1] = arrStr[i] - arrStr[i + 1];
            arrStr[i] = arrStr[i] - arrStr[i + 1];
        }
        else continue;                                          // Иначе, прекрашаем итерацию
        SortRow(arrStr);                                        // Рекусия
    }
    return arrStr;                                              // Возвращаем отсортированный массив
}


// ТЕЛО ПРОГРАММЫ
Console.WriteLine("Введите количество строк:");                             // Запрашиваем количество строк
int rowsMtrx = int.Parse(Console.ReadLine());
Console.WriteLine("Введите количество солбцов:");                           // Запрашиваем количество столбцов
int colsMtrx = int.Parse(Console.ReadLine());

int minInterval = -100;                                                     // Интервал значений матрицы
int maxInterval = 100;

int[,] intMatrix = FillMatrix(rowsMtrx, colsMtrx, minInterval, maxInterval);    // Заполняем матрицу значениями
Console.WriteLine("\nСтарая");                                              // Всякие красивости вывода
PrintMatrix(intMatrix); 

intMatrix = SortMatrixRows(intMatrix);
Console.WriteLine("\nУпорядоченная по убыванию");                           // Всякие красивости вывода
PrintMatrix(intMatrix);

Console.WriteLine("");                                                      // Всякие красивости вывода
