// Задача 27: Напишите программу, которая принимает на вход число и выдаёт сумму цифр в числе.
// 452 -> 11
// 82 -> 10
// 9012 -> 12

int sumNum(string num)                      // Функция складывает все цифры в числе
{
    int summ = 0;
    int add = 0;                            // Переменная для эдемента в массиве строки, 
    for (int i = 0; i < num.Length; i++)    // передаваемой в метод
    {
        // Console.WriteLine(summ.GetType())
        add = Convert.ToInt32(Char.GetNumericValue(num[i]));    // текущий элемент массива строки перевели в символ и дальше в int 
        // Проверка, что элемент число
        if (add == 0 || add == 1  || add == 2 || add == 3 || add == 4 || add == 5 || add == 6 || add == 7 || add == 8 || add == 9)
        {
            summ = summ + add;
        }
    }
    return summ;
}

Console.WriteLine("Введите число: ");
string numString = Console.ReadLine();

Console.WriteLine("Сумма всех цифр в числе равна: " + sumNum(numString));
