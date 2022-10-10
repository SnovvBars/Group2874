# Задача 1
# Вычислить число c заданной точностью d
# Пример:
# - при $d = 0.001, π = 3.141.$    $10^{-1} ≤ d ≤10^{-10}$

# Решение

def digit_check(text_invitation, key):             # Проверка ввода
    success_input = True
    while success_input:
        try:   
            num = float(input(text_invitation))
            if num <= 0.1 and num >= 0.0000000001 and key != 2:  
                success_input = False
            elif (key == 2):
                 success_input = False
        except:
            print("\nВведите корректное число!\n")
    return num

number_round = digit_check("\nВведите число в диапазоне $10^{-1} - 10^{-10}$: ", 1)
number = digit_check("\nВведите число для вычисления точности: ", 2)
print ("\n")
print (round(number, len(str(number_round)) - 2 ))
print ("\n")

# =======================================================================
# Задача 2
# Задайте натуральное число N. Напишите программу, которая составит список простых множителей числа N.

# Решение

def digit_check(text_invitation):   # Проверка ввода
    success_input = True
    while success_input:
        try:
            num = int(input(text_invitation))
            if num > 0: 
                success_input = False
        except:
            print("\nВведите корректное число!\n")
    return num

def simple_find(n):
    list_num = []
    num = 2
    while num * num <= n:
        if n % num == 0:
            list_num.append(num)
            n //= num
        else:
            num += 1
    if n > 1:
        list_num.append(n)
    return list_num

number = digit_check("\nВведите целое положительное число: ")
print(simple_find(number))

# ==================================================

# Задача 3
# Задайте последовательность чисел. Напишите программу, 
# которая выведет список неповторяющихся элементов исходной последовательности.

def digit_check(text_invitation):             # Проверка ввода
    success_input = True
    while success_input:
        try:
            num = int(input(text_invitation)) 
            success_input = False
        except:
            print("\nВведите корректное число!\n")
    return num

from random import randint

def random_fill(number):    # Заполнение случайными числами
    for i in range(0, number):
        mass[i] = randint(0, number)
        mass.append(mass[i])
    return mass


number = digit_check("\nВведите число элементов: ")
mass = [0]
mass = random_fill(number - 1)
print("Диапазон из {} случайных чисел\n{}".format(number, mass))
mass = list(set(mass))
print("Список после удаления дубликатов\n{}".format(mass))

# ================================================

# Задача 4
# Задана натуральная степень k. Сформировать случайным образом список коэффициентов 
# (значения от 0 до 100) многочлена и записать в файл многочлен степени k.
# Пример:
# - k=2 => 2*x² + 4*x + 5 = 0 или x² + 5 = 0 или 10*x² = 0

from random import randint
import itertools

k = randint(2, 7)

def get_ratios(k):
    ratios = [randint(0, 10) for i in range (k + 1)]
    while ratios[0] == 0:
        ratios[0] = randint(1, 10) 
    return ratios

def get_pol1(k, ratios):
    var = ['*x^']*(k-1) + ['*x']
    pol1 = [[a, b, c] for a, b, c  in itertools.zip_longest(ratios, var, range(k, 1, -1), fillvalue = '') if a !=0]
    for x in pol1:
        x.append(' + ')
    pol1 = list(itertools.chain(*pol1))
    pol1[-1] = ' = 0'
    return "".join(map(str, pol1)).replace(' 1*x',' x')


ratios = get_ratios(k)
polynom1 = get_pol1(k, ratios)
print(polynom1)

with open('pol1.txt', 'w') as data:
    data.write(polynom1)
