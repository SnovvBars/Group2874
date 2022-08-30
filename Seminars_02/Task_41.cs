// Задача 41: Пользователь вводит с клавиатуры M чисел. Посчитайте, сколько чисел больше 0 ввёл пользователь.
// 0, 7, 8, -2, -2 -> 2
// 1, -7, 567, 89, 223-> 3  ОШИБКА!!! 4, а не 3

// ***      Программа запрашивает числа до тех пор, пока пользователь    ***
// ***      вводит y на вопрос "Еще число?".                             ***
// ***      Каждое число добавляется в строку commStr, с разделителем    ***
// ***      пробел. Затем строка разбивается на массив чисел             ***

void printNumbers(string numStr)                                        // Печатаем введенные числа
{
    Console.WriteLine("\nВы ввели:");
    for (int i = 0; i < numStr.Length; i++)
    {
        Console.Write(numStr[i]);
    }
}

void numPositive(string numStr)                                         // подсчет положитнльных чисел
{
    int count = 0;                                                      // Счетчик полож. чисел
    string[] strTmp = numStr.Split(" ");                                // Разбиваем переданную строку на элементы
    for (int i = 0; i < strTmp.Length; i++)
    {
        if (double.Parse(strTmp[i]) > 0 )                               // Если элемент > 0
        {
            count++;                                                    // Печатаем его и увеличиваем сетчик
            if (count == 1) Console.WriteLine("\nЭлементы больше нуля:");
            Console.WriteLine(strTmp[i]);
        }
    }
    if (count == 0) Console.WriteLine("\nПоложительных эленментов не найдено!\n");
    else            Console.WriteLine("Всего: " + count + "\n");
}

// Тело программы

char c;                                                                 // Будет следить, нажал ли юзер "y"
string commStr = "";                                                    // Сюда записываем введенные юзером числа

do                                                                      // пока юзер нажимает "y", просим ввести число
{
    Console.WriteLine("Введите число:");
    commStr = commStr + Console.ReadLine() + " ";                       // плюсуем введенное число к общей строке
                                                                        // и добавляем пробел как разделитель
    Console.WriteLine("Еще число? (y/n)");
    c = char.Parse(Console.ReadLine());
}
while (c.Equals(char.Parse("y")));

commStr = commStr.Remove(commStr.Length - 1);                           // отсекаем последний пробел в строке

printNumbers(commStr);                                                  // печатаем введенные числа
numPositive(commStr);                                                   // выводим и считаем положительные
