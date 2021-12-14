print("*********************************")
print("Bem vindo ao jogo de Adivinhação!")
print("*********************************")

secret_number = 42

chute = input("Digite o seu número: ")

if int(chute) == secret_number:
    print("Parabéns, você acertou!")
else:
    print("Você errou!")