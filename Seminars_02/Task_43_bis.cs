// Доп. задча: Задайте двумерный массив со случайными числами от -10 до 10. 
// Найдите сумму элементов, находящихся на главной диагонали (с индексами (0,0); (1;1) и т.д.)
// Например, задан массив:
// 1 4 7 2
// 5 9 2 3
// 8 4 2 4
// Сумма элементов главной диагонали: 1+9+2 = 12

// Методы
int[,] FillQuadArray(int cols, int rows, int min, int max)                  // Заполнение случайными числами
{
    int[,] rndMatrix = new int[cols, rows];
    for (int i = 0; i < cols; i++)
    {
        for (int j = 0; j < rows; j++)
        {
            rndMatrix[i, j] = new Random().Next(min, max + 1);
        }
    }
    return rndMatrix;
}

void PrintMatrix(int[,] matrix)                                             // Печать матрицы
{   
    Console.WriteLine("");
    for (int i = 0; i < matrix.GetLength(0); i++)
    {
        for (int j = 0; j < matrix.GetLength(1); j++)
        {
            Console.Write($"{matrix[i, j]} ");
        }
        Console.WriteLine("");
    }
    Console.WriteLine("");
}

void SumDiagonal(int[,] matrix)                                                         // Метод вычисления суммы
{
    int maxIndex = 0;                                                                   
    int summ = 0;
    if (matrix.GetLength(0) > matrix.GetLength(1)) maxIndex = matrix.GetLength(1);      // чего меньше - строк или столбцов
    else maxIndex = matrix.GetLength(0);
    for (int i = 0; i < maxIndex; i++)                          
    {
        summ = summ + matrix[i, i];
    }
    Console.WriteLine($"\nСумма элементов главной диагонали равна {summ}\n");
}

// Тело программы
Console.WriteLine("\nВведите количество строк:");
int mRows = int.Parse(Console.ReadLine());

Console.WriteLine("\nВведите количество столбцов:");
int mCols = int.Parse(Console.ReadLine());

Console.WriteLine("\nЗадайте минимальное значение:");
int mMin = int.Parse(Console.ReadLine());

Console.WriteLine("\nЗадайте максимальное значение:");
int mMax = int.Parse(Console.ReadLine());

int[,] qMatrix = FillQuadArray(mRows, mCols, mMin, mMax);               // Заполнение матрицы случайными числами
PrintMatrix(qMatrix);                                                   // Печать матрицы
SumDiagonal(qMatrix);                                                   // Вычисление суммы
