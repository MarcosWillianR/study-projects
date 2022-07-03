import random


def play():
    print("*********************************")
    print("***Bem vindo ao jogo da Forca!***")
    print("*********************************")

    palavra_secreta = "banana".upper()
    letras_acertadas = ["_" for letra in palavra_secreta]

    enforcou = False
    acertou = False
    tentativas = 6

    print(f"{' '.join(letras_acertadas)}")

    while (not enforcou and not acertou):
        chute = input("Qual letra? ")
        chute = chute.strip().upper()

        if chute in palavra_secreta:
            for (i, letra) in enumerate(palavra_secreta):
                if chute == letra:
                    letras_acertadas[i] = letra
        else:
            tentativas -= 1

        enforcou = tentativas == 0
        acertou = "_" not in letras_acertadas

        print(f"{' '.join(letras_acertadas)}")

    if acertou:
        print("Parabéns, você ganhou!")

    if enforcou:
        print("Você perdeu!")
        print(f"A palavra secreta era {palavra_secreta}")

    print("Fim do jogo.")


if __name__ == "__main__":
    play()
