# Создайте программу для игры в ""Крестики-нолики"".

from random import randint

def check_num(text_invitation, min, max):             # Проверка ввода
    while True:
        input_data = input(text_invitation)
        if not input_data.isnumeric():
            print("Вы ввели не число. Попробуйте снова: ")
        elif not min <= int(input_data) <= max:
            print("Столько конфет брать нельзя! Попробуйте снова")
        else:
            return input_data

def bild_field(cells):                                  # Построение игрового поля
    print('-'*13)
    for i in range(3):
        print('|', cells[0+i*3],'|', cells[1+i*3], '|', cells[2+i*3], '|')
        print('-'*13)

def input_cell(player):                                 # Выбор клетки игроком или ботом
    if player == 1:
        num = check_num("\nВведите число: ", 1, 9)      # Отсылка на проверку правильности ввода
    else: num = generate_num(0, 9)                      # Генерируем номер поля бота
    return int(num)  

def generate_num(min, max):                             # Генератор индекса от 0 до 8 
    return randint(min, max)

# В эту функцию передается текущий массив значений (заполненных и нет клеток)
# и список выигрышных позиций
def check_victory(my_substr, my_str):                   # Проверка победной комбинации
    my_substr = "".join(map(str,my_substr))             # Передаваемый массив значений полей на текущий момент сливаем в строку
    lst_pentacl = [i for i in range(len(my_substr)) if my_substr[i] == "*"]  # создаем список индексов вхождений *
    lst_points = [i for i in range(len(my_substr)) if my_substr[i] == "."]   # тоже для .
    
    for i in range(len(my_str)):                         # сравниваем есть ли в текущем списке индексов звездочек
        if set(my_str[i]).issubset(lst_pentacl):        # выигрышная комбинация
            bild_field(my_substr)
            print("\nПобедил игрок\n")                  # если есть, победил игрок
            exit()
        elif set(my_str[i]).issubset(lst_points):          # тоже для .
            bild_field(my_substr)
            print("\nПобедил бот\n")
            exit()
    return False

# Тело программы

cells = list(range(1, 10))      # Список значений
bild_field(cells)               # Строим поле
current_player = 1              # Игрок всегда первый (можно и случайно, бот или игрок)
# Индексы выигрышных комбинаций
str_victory = [(0, 1, 2), (3, 4, 5), (6, 7, 8), (0, 3, 6), (1, 4, 7), (2, 5, 8), (0, 4, 8), (2, 4, 6)]

while check_victory(cells, str_victory) == False:           # Пока выигрышные комбинации не встретятся 
    cell_index = input_cell(current_player) - 1
    if type(cells[cell_index]) == int:                      # Если клетка не занята
        if current_player == 1: cells[cell_index] = '*'     # ставим *
        else: 
            cells[cell_index] = '.'                         # или .
            print("\nХод бота")
            bild_field(cells)                               # Строим поле с уже ходом
        if current_player == 1: current_player = 2          # Ходим поочередно
        elif current_player == 2: current_player = 1
    else: 
        if current_player == 1:                             # Для игрока выводим предупреждение, для бота не надо
            print("\nЗанято!")
        cell_index = input_cell(current_player) - 1

bild_field(cells)
print ("Ничья")
