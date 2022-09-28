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
int CalcSum(int[,] matrix, int i)           // Вычисляет сумму элементов в передаваемой строке в переданной матрице
{
    int sum = 0;                            // Инициализируем начальную сумму
    for (int j = 0; j < matrix.GetLength(1); j++)
    {
        sum = sum + matrix[i, j];
    }
    return sum;                             // Возвращаем результат
}


// ТЕЛО ПРОГРАММЫ
Console.WriteLine("Введите количество строк:");                             // Запрашиваем количество строк
int rowsMtrx = int.Parse(Console.ReadLine());
Console.WriteLine("Введите количество солбцов:");                           // Запрашиваем количество столбцов
int colsMtrx = int.Parse(Console.ReadLine());

int minInterval = -10;                                                     // Интервал значений матрицы
int maxInterval = 10;

int[,] intMatrix = FillMatrix(rowsMtrx, colsMtrx, minInterval, maxInterval);    // Заполняем матрицу значениями
Console.WriteLine("");                                              // Всякие красивости вывода
PrintMatrix(intMatrix); 

Console.WriteLine("");  

int summmRow = CalcSum(intMatrix, 0);           // Инициализируем начальную сумму, равной сумме элеменьлов 1й строки
int currentRow = 0;                             // Инициализируем счетчик строки, где на текущую итеррацию минимальная сумма
                                                // элементов в строке. Начинаем с первой строки
for (int i = 0; i < intMatrix.GetLength(0); i++)
{
    Console.WriteLine(" Текущая строка: " + (i + 1));                       // Введена для контроля правильности подсчетов
    Console.WriteLine(" Текущяя сумма: " + CalcSum(intMatrix, i) + "\n");   // То же
    if (CalcSum(intMatrix, i) < summmRow)                                   // Проверяем, сумма текущей строки больше текущего значения суммы элементов?
    {
        summmRow = CalcSum(intMatrix, i);
        currentRow = i;
    }
    else continue;
}
Console.WriteLine("\nСтрока с минимальной суммой элементов равна: " + (currentRow + 1) + "\n");
