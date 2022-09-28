// Задача 58: Задайте две матрицы. Напишите программу, которая будет находить произведение двух матриц.
// Например, даны 2 матрицы:
// 2 4 | 3 4
// 3 2 | 3 3
// Результирующая матрица будет:
// 18 20
// 15 18

int[,] FillMatrix(int rows, int cols, int min, int max) // Заполняем матрицу
{
    int[,] tmpMatrix = new int[rows, cols];
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < cols; j++)
        {
            tmpMatrix[i, j] = new Random().Next(min, max + 1);
        }
    }
    return tmpMatrix;
}

//
void PrintMatrix(int[,] matrix) // Печатаем матрицу
{
    Console.WriteLine($"{matrix.GetLength(0)}x{matrix.GetLength(1)}:"); // Просто инфо о размерности матрицы
    for (int i = 0; i < matrix.GetLength(0); i++)
    {
        for (int j = 0; j < matrix.GetLength(1); j++)
        {
            Console.Write("{0, 4} |  ", matrix[i, j]); // Форматируем вывод по шаблону |  24 |  18 |  34 |  76 |
        }
        Console.WriteLine("");
    }
}

int ResNumber(int[,] matrixA, int[,] matrixB, int row, int col) // Функция перемножает матрицы построчно
{
    int resNum = 0;
    for (int j = 0; j < matrixA.GetLength(1); j++)
    {
        resNum = matrixA[row, j] * matrixB[j, col] + resNum;
    }
    return resNum;
}

// ТЕЛО ПРОГРАММЫ
Console.WriteLine("Введите количество строк матрицы A:"); // Запрашиваем количество строк
int rowsMtrxA = int.Parse(Console.ReadLine());
Console.WriteLine("Введите количество солбцов матрицы A:"); // Запрашиваем количество столбцов
int colsMtrxA = int.Parse(Console.ReadLine());

Console.WriteLine("Введите количество строк матрицы B:"); // Запрашиваем количество строк
int rowsMtrxB = int.Parse(Console.ReadLine());
Console.WriteLine("Введите количество солбцов матрицы B:"); // Запрашиваем количество столбцов
int colsMtrxB = int.Parse(Console.ReadLine());

if (
    (rowsMtrxA == rowsMtrxB) && (colsMtrxA == colsMtrxB)
    || // Проверка на возможность перемножать матрицы
    (rowsMtrxA == colsMtrxB) && (colsMtrxA == rowsMtrxB)
)
{
    int minInterval = 0; // Интервал значений матрицы
    int maxInterval = 10;

    int[,] matrixA = FillMatrix(rowsMtrxA, colsMtrxA, minInterval, maxInterval); // Заполняем матрицу значениями
    Console.WriteLine(""); // Всякие красивости вывода
    Console.WriteLine("Матрица А");
    PrintMatrix(matrixA);

    int[,] matrixB = FillMatrix(rowsMtrxB, colsMtrxB, minInterval, maxInterval); // Заполняем матрицу значениями
    Console.WriteLine(""); // Всякие красивости вывода
    Console.WriteLine("Матрица B");
    PrintMatrix(matrixB);               // Печатаем вторую матрицу

    int sizeMatrix = rowsMtrxA;         // Размерность итоговой матрицы (равна количеству строк первой матрицы)

    int[,] resMatrix = FillMatrix(sizeMatrix, sizeMatrix, 0, 0);    // Инициируем итоговую матрицу, заполняем нулями

    for (int i = 0; i < sizeMatrix; i++)                    // Заполняем итоговый массив
    {
        for (int j = 0; j < sizeMatrix; j++)
        {
            int summ = ResNumber(matrixA, matrixB, i, j);   // Вызываем метод подсчета произведения строки матрицы А на столбец матрицы B
            // Console.WriteLine($"Значение ячейки ({i}, {j}) равно {summ}");
            resMatrix[i, j] = summ;
        }
    }

    Console.WriteLine("\nИтоговая матрица");
    PrintMatrix(resMatrix);
    Console.WriteLine("");
}
else
    Console.WriteLine(
        "\nПроизведение двух матриц АВ имеет смысл только в том случае,\n"
            + "когда число столбцов матрицы А совпадает с числом строк матрицы В.\n"
            + "Попробуйте снова!\n"
    );
