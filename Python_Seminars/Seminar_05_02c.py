# Задача 2 - ИГРА С БОТОМ

# Создайте программу для игры с конфетами человек против человека.

# Условие задачи: На столе лежит 2021 конфета. Играют два игрока делая ход друг после друга. 
# Первый ход определяется жеребьёвкой. За один ход можно забрать не более чем 28 конфет. 
# Все конфеты оппонента достаются сделавшему последний ход. 
# Сколько конфет нужно взять первому игроку, чтобы забрать все конфеты у своего конкурента?

# a) Добавьте игру против бота
# b) Подумайте как наделить бота ""интеллектом""

# Решение

# Первому  игроку  надо первым ходом забрать остаток от целочисленного деления
# имеющегося количества конфет на то, которое можно взять за 1 ход максимально + 1
# В дальнейшем первому игроку нужно повторять те же вычисления
# Пример :  2021 % ( 28 + 1 ) = 20 , первый игрок первым ходом должен взять 20 конфет.
# если вторым ходом второй игрок взял 12 конфет, то первый должен взять 1991 % (28 + 1) и так далее..

# ЧТОБЫ БОТ ВСЕГДА ВЫИГРЫВАЛ, ПУСКАЙ ОН ХОДИТ ПЕРВЫМ
# ТОГДА ФУНКЦИЮ РАНДОМНОГО ЗАБОРА КОНФЕТ ЗАМЕНЯЕМ НА ФОРМУЛЬНУЮ

# БОТ ВОРОЙ (ПО НОМЕРУ) ИГРОК


from random import randint

def check_taken(text_invitation, min, max):             # Проверка ввода
    while True:
        input_data = input(text_invitation)
        if not input_data.isnumeric():
            print("Вы ввели не число. Попробуйте снова: ")
        elif not min <= int(input_data) <= max:
            print("Столько конфет брать нельзя! Попробуйте снова")
        else:
            return input_data

def print_greet(player, min, max, ostatok):                                 # Поочередный ход с проверкой количества
    print(("\nХод игрока {}".format(player_name(player))).upper())          # конфет
    print("Осталось {} конфет".format(ostatok))
    if player == 1: count_taken = check_taken('Сколько хотите взять (1 - 28)? ', min, max) # Если игрок
    elif player == 2: count_taken = num_bot_random(max, ostatok)                                #  Если бот
    return int(count_taken)

def player_name(name):                                                      # Соответствие номеров именам игроков
    if name == 1: return player_1 
    elif name == 2: return player_2

def num_bot_random(max, ostatok):                                      # Вычисляем по формуле 2021 % (max + 1)
    candy = ostatok%(max + 1)
    print("{} взял {} конфет".format(player_name(2), candy))
    return candy

# Тело программы

player_1 = input("\nИмя игрока: ")
player_2 = "Бот"

res = 2021                                          # Количество конфет можно задать произвольно
max = 28                                            # Сколько брать тоже

print ('''
    Правила игры:
    На столе лежит {} конфета. Играют два игрока делая ход друг после друга.
    Первый ход определяется жеребьёвкой. За один ход можно забрать не более чем 28 конфет.
    Все конфеты оппонента достаются сделавшему последний ход.
    '''.format(res))

current_player = 2              # Бот ходит первый

while res >= 0:                             # Пока есть конфеты на столе
    if res > max:
        res = res - print_greet(current_player, 1, max, res)
    elif res <= max and res > 0:
        res = res - print_greet(current_player, 1, res, res)
        if res == 0:
            print(("\nПобедил {}!!!\nПоздравляю!\nGame over\n".format(player_name(current_player))).upper())
            break
    if  current_player == 1: current_player = 2         # Смена игроков
    elif current_player == 2: current_player = 1
