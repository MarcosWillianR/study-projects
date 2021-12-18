print("*********************************")
print("Bem vindo ao jogo de Adivinhação!")
print("*********************************")

secret_number = 42

tentativas = 3
tentativa_atual = 1

while tentativa_atual <= tentativas:
    print(f"Tentativa {tentativa_atual} de {tentativas}")

    chute = int(input("Digite o seu número: "))
    bigger = chute == secret_number
    less = chute < secret_number

    if bigger:
        print("Congratz, you won!")
        break
    elif less:
        print("Você errou, o número secreto é maior")
    else:
        print("Você errou, o número secreto é menor")

    tentativa_atual += 1

print("Fim de jogo")
