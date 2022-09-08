// Задача 60. ...Сформируйте трёхмерный массив из неповторяющихся
// двузначных чисел. Напишите программу, которая будет построчно выводить массив,
// добавляя индексы каждого элемента.
// Массив размером 2 x 2 x 2
// 66(0,0,0) 25(0,0,1)
// 34(0,1,0) 41(0,1,1)
// 27(1,0,0) 90(1,0,1)
// 26(1,1,0) 55(1,1,1)

// Методы+++++++++++++++++++++++++
int[,,] Fill3DMassive(int x, int y, int z)                      // Создаем массив с настраиваими параметрами
{                                                               // По условиям числа не должны повторяться
    int numTMP = 0;
    int[,,] mass3D = new int[x, y, z];                          // Инициация массива
    for (int i = 0; i < x; i++)
    {
        for (int j = 0; j < y; j++)
        {
            for (int k = 0; k < z; k++)
            {
                do                                              // Проверяем, есть ли число в массиве, если есть, цикл 
                {                                               // случайнрго числа, пока на будет новое
                    numTMP = new Random().Next(10, 100);
                    mass3D[i, j, k] = numTMP;
                } 
                while (ChekUnic(mass3D, numTMP, x, y, z) == true); // передаем массив и случайное чило в функцию сравнения
            }
        }
    }
    return mass3D;
}

bool ChekUnic(int[,,] massive3D, int num, int x, int y, int z)      // Функция сравнения
{
    for (int i = 0; i < x; i++)
    {
        for (int j = 0; j < y; j++)
        {
            for (int k = 0; k < z; k++)
            {
                if (massive3D[i, j, k] == num)
                {
                    return false;
                }
            }
        }
    }
    return true;
}

void PrintMass(int[,,] arr, int f, int y, int z)                // Метод печати
{
Console.WriteLine("");
    for (int i = 0; i < f; i++)
    {
        for (int j = 0; j < y; j++)
        {
            for (int k = 0; k < z; k++)
            {
                Console.Write($"{arr[i, j, k]} ({i}, {j}, {k}),  ");
            }
            Console.WriteLine("");
        }
Console.WriteLine("");    }
}
// Методы конец ++++++++++++++++++++++++++++++++++++++++
// Тело пронраммы
int heightM = 2;        // Параметры массива. Числа любые
int width = 2;
int deepM = 2;

int[,,] massive = Fill3DMassive(heightM, width, deepM);
PrintMass(massive, heightM, width, deepM);
