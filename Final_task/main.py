# f(x) = -12x^4*sin(cos(x)) - 18x^3+5x^2 + 10x - 30
# f(x) = -5*x**2 + 10*x - 150 - РАБОТАЕМ С НЕЙ !!!!!

from sympy import *
from sympy.plotting import plot
# from math import sqrt

#  Нахождение корней
def def_roots(f, x):
    return solve(f, x)

# Определение вверх гипербола или вниз
def up_down(f, x, x_top):
    if f.subs(x, x_top) > f.subs(x, x_top + 1) : return 'up'
    else :  return 'down'


# Определение координат вершины
def coord_top(fx, x):
    df = str(diff(fx, x))               # Получаем производную функции вида ax + b  
                                        # Иногда выдает вида b + ax или b - ax или ax - b
                                        # поэтому перебираем все варианты
    df = (str(df)).split(' ')           # list со значениями a*x, знак, b
    if len(df) > 1 :
        for item in df:                     # Перебираем лист
            if '*' in item:                 # Если есть *, значит это а
                a = item[0:item.find('*')]
            elif ('*' and '-') not in item: # Если нет * и -, значит это b
                b = item
        if df[1] == '-' and '*' in df[0]:   # Выясняем, какому коэффициенту принадлежит минус
            b = -float(b)
        if df[1] == '-' and '*' in df[2]:
            a = -float(a)
        xtop = -(float(b)/float(a))         # Решаем линейное уравнение
        return xtop
    else : return 0

def main():                             # Основной блок
# Координата вершины (или нижней точки)    
    x_top = coord_top(fx, x)
    
    print('\nУравнение:\n   {}'.format(fx))

# 1. Определить корни
    print ('\n1. Корни квадратного уравнения равны:\n   {} и {}\n'.format(def_roots(fx, x)[0], def_roots(fx, x)[1]))

# 2. Найти интервалы, на которых функция возрастает
    if (up_down(fx, x, x_top)) == 'up' :
        print('2. На интервале от минус бесконечности до {:.2f}\n   функция возрастает\n'.format(x_top))
    elif (up_down(fx, x, x_top)) == 'down' :
        print('2. На интервале от {:.2f} до бесконечности\n   функция возрастает\n'.format(x_top))
    else : print('2. Сложно сказать...\n')

# 3. Найти интервалы, на которых функция убывает
    if (up_down(fx, x, x_top)) == 'up' :
        print('3. На интервале от {:.2f} до бесконечности \n   функция убывает\n'.format(x_top))
    elif (up_down(fx, x, x_top)) == 'down' :
        print('3. На интервале от минус бесконечности до {:.2f}\n   функция убывает\n'.format(x_top))
    else : print('3. Сложно сказать...\n')

# 4. Построить график
    print('4. График функции\n'.format(fx))
    plot(fx)
    print('')

# 5. Вычислить вершину   
    if (up_down(fx, x, x_top)) == 'up' :
        print ('5. Координаты вершины:\n   x = {:.2f}, y = {:.2f}\n'.format(x_top, fx.subs(x, x_top)))
    elif (up_down(fx, x, x_top)) == 'down' :
        print ('5. Вершины нет, есть дно. Его координаты:\n   x = {:.2f}, y = {:.2f}\n'.format(x_top, fx.subs(x, x_top)))
    else : print('5. Сложно сказать...')

# 6. Определить промежутки, на котором f > 0
    if (up_down(fx, x, x_top)) == 'up' :
        if (fx.subs(x, x_top)) < 0 :
            print('6. На всем промежутке от минус бесконечности до бесконечности\n   функция меньше 0\n')
        else :
            print('6. На промежутке от {:.2f} до {:.2f}\n   функция больше 0\n'.format(def_roots(fx, x)[0], def_roots(fx, x)[1]))     
    elif (up_down(fx, x, x_top)) == 'down' :
        if (fx.subs(x, x_top)) >= 0 :
            print('6. На всем промежутке от минус бесконечности до бесконечности\n   функция больше 0\n')
        else :
            print('6. На промежутке от минус бесконечности до {:.2f} и от {:.2f} до бесконечности\n   функция больше 0\n'.format(def_roots(fx, x)[0], def_roots(fx, x)[1]))     

# 7. Определить промежутки, на котором f < 0
    if (up_down(fx, x, x_top)) == 'up' :
        if (fx.subs(x, x_top)) < 0 :
            print('7. На всем промежутке от минус бесконечности до бесконечности\n   функция меньше 0\n')
        else :
            print('7. На промежутке от минус бесконечности до {:.2f} и от {:.2f} до бескончности \n   функция меньше 0\n'.format(def_roots(fx, x)[0], def_roots(fx, x)[1]))     
    elif (up_down(fx, x, x_top)) == 'down' :
        if (fx.subs(x, x_top)) >= 0 :
            print('7. На всем промежутке от минус бесконечности до бесконечности\n   функция больше 0\n')
        else :
            print('7. На промежутке от {:.2f} до {:.2f}\n   функция меньше 0\n'.format(def_roots(fx, x)[0], def_roots(fx, x)[1]))     

def simple_case():
    if a < 0 :
        print('''
Функция растет от бесконечности до нуля, уменьшается от нуля до бесконечности.
На всех интервалах меньше нуля, кроме самого нуля.
Координаты вершины 0, 0  
''')
    else : 
        print('''
Функция убывает от бесконечности до нуля, растет от нуля до бесконечности.
На всех интервалах больше нуля, кроме самого нуля.
Координаты нижней точки 0, 0  
''')
    print('График функции\n'.format(fx))
    plot(fx)
    print('')

def init():
# f(x) = -5*x**2 + 10*x - 150    
    global x, a, b, c, fx
    x = Symbol('x')
# Коэффициенты многочлена
    a = -5
    b = 10
    c = -150
    fx = a*x**2 + b*x + c

    if a != 0 and b != 0 and c != 0 : main()
    elif b == 0 and c == 0 : simple_case()
    elif a == 0 : print('\nПрямая!\n')

init_printing()
init()
