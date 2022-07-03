import random


def play():
    apresentacao()

    palavra_secreta = carrega_palavra_secreta()
    if palavra_secreta == '':
        print("Não foi possível carregar uma palavra secreta.")
        return

    letras_acertadas = inicializa_letras_acertadas(palavra_secreta)
    enforcou = False
    acertou = False
    erros = 0

    desenha_forca(erros)
    print(f"{' '.join(letras_acertadas)}")

    while (not enforcou and not acertou):
        chute = pede_chute()

        if chute in palavra_secreta:
            marcar_chute_correto(chute, letras_acertadas, palavra_secreta)
        else:
            erros += 1
            desenha_forca(erros)

        enforcou = erros == 7
        acertou = "_" not in letras_acertadas

        print(f"{' '.join(letras_acertadas)}")

    if acertou:
        imprime_mensagem_vencedor()
    if enforcou:
        imprime_mensagem_perdedor(palavra_secreta)


def apresentacao():
    print("*********************************")
    print("***Bem vindo ao jogo da Forca!***")
    print("*********************************")


def carrega_palavra_secreta():
    with open('palavras.txt', encoding='utf-8') as arquivo:
        palavras = [palavra for palavra in arquivo.read().splitlines() if palavra != '']
        if len(palavras) != 0:
            numero = random.randrange(0, len(palavras))
            palavra_secreta = palavras[numero].upper()
        else:
            palavra_secreta = ''
    return palavra_secreta


def inicializa_letras_acertadas(palavra):
    return ["_" for letra in palavra]


def pede_chute():
    chute = input("Qual letra? ")
    chute = chute.strip().upper()
    return chute


def marcar_chute_correto(chute, letras_acertadas, palavra_secreta):
    for (i, letra) in enumerate(palavra_secreta):
        if chute == letra:
            letras_acertadas[i] = letra


def imprime_mensagem_vencedor():
    print("Parabéns, você ganhou!")
    print("       ___________      ")
    print("      '._==_==_=_.'     ")
    print("      .-\\:      /-.    ")
    print("     | (|:.     |) |    ")
    print("      '-|:.     |-'     ")
    print("        \\::.    /      ")
    print("         '::. .'        ")
    print("           ) (          ")
    print("         _.' '._        ")
    print("        '-------'       ")


def imprime_mensagem_perdedor(palavra_secreta):
    print("Puxa, você foi enforcado!")
    print(f"A palavra era {palavra_secreta}")
    print("    _______________         ")
    print("   /               \       ")
    print("  /                 \      ")
    print("//                   \/\  ")
    print("\|   XXXX     XXXX   | /   ")
    print(" |   XXXX     XXXX   |/     ")
    print(" |   XXX       XXX   |      ")
    print(" |                   |      ")
    print(" \__      XXX      __/     ")
    print("   |\     XXX     /|       ")
    print("   | |           | |        ")
    print("   | I I I I I I I |        ")
    print("   |  I I I I I I  |        ")
    print("   \_             _/       ")
    print("     \_         _/         ")
    print("       \_______/           ")


def desenha_forca(erros):
    backslash = "\\"
    print("  _______     ")
    print(" |/      |    ")
    print(f" |      {'(' if erros >= 1 else ''}{'_' if erros >= 2 else ''}{')' if erros >= 3 else ''}   ")
    if erros <= 4:
        print(f" |      {' |' if erros >= 4 else ''}   ")
    else:
        print(f" |      {backslash if erros >= 5 else ''}{'|' if erros >= 4 else ''}{'/' if erros >= 5 else ''}   ")
    print(f" |       {'|' if erros >= 4 else ''}    ")
    print(f" |      {'/' if erros >= 6 else ''} {backslash if erros >= 7 else ''}   ")
    print(" |            ")
    print("_|___         ")


if __name__ == "__main__":
    play()
