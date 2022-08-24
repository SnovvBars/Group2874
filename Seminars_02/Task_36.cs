// Задача 36: Задайте одномерный массив, заполненный случайными числами.
// Найдите сумму элементов, стоящих на нечётных позициях.
// [3, 7, 23, 12] -> 19
// [-4, -6, 89, 6] -> 0

// Определение методов

int[] fillArray(int size)           // Метод, заполняющий массив случайными числами от -100 до 100
{
    int[] array = new int[size];
    Console.WriteLine("\r\nМассив:");            // Печатаем слово Массив
    for (int i = 0; i < size; i++)
    {
        array[i] = new Random().Next(-100, 101); // Генерируем элемент массива
        Console.Write(array[i] + " ");           // Печатаем его
    }
    Console.WriteLine("");
    return array;                                // Вернули массив
}

void countSummOddPositions(int[] array)          // Метод подсчета нечетных
{
    int summ = 0;                                // Вводим переменную суммы нечетных
    for (int i = 1; i < array.Length; i++)
    {
        if (i % 2 != 0)
            summ = summ + array[i];
    }
    Console.WriteLine("\r\nСумма элементов на нечетных позициях равна: " + summ + "\r\n");
    return;
}

// Тело программы

Console.WriteLine("Введите размерность массива.");
Console.WriteLine("(Количество элементов должно быть больше 1): ");
int sizeArray = int.Parse(Console.ReadLine());

if (sizeArray <= 1)                             // Если введен нулевой или единичный размер массива, заканчиваем.
    Console.WriteLine("\r\nКоличество элементов должно быть больше 1. Попробуйте еще раз\r\n");
else                                            // Иначе вызываем по порядку метод создания массива
{                                               // и метод подсчета числа нечетных чисел
    int[] arrayOdd = fillArray(sizeArray);
    countSummOddPositions(arrayOdd);
}
