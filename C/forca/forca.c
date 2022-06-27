#include <stdio.h>
#include <string.h>

void abertura() {
  printf("*************************************\n");
  printf("*    Bem-vindo ao jogo da forca!    *\n");
  printf("*************************************\n\n");
}

void chuta(char chutes[26], int* tentativas) {
  printf("\n");
  char chute;
  scanf(" %c", &chute); // precisa do espaço para não ler o enter
  
  chutes[(*tentativas)] = chute;
  (*tentativas)++;
}

int jachutou(char letra, char chutes[26], int tentativas) {
  int achou = 0;
  for (int j = 0; j < tentativas; j++) {
    if (chutes[j] == letra) {
      achou = 1;
      break;
    }
  }
  return achou;
}

void desenhaforca(char palavrasecreta[20], int tentativas, char chutes[26]) {
  for (int i = 0; strlen(palavrasecreta) > i; i++) {
    int achou = jachutou(palavrasecreta[i], chutes, tentativas);
    if (achou) {
      printf("%c ", palavrasecreta[i]);
    } else {
      printf("_ ");
    }
  }
}

void escolhepalavra(char palavrasecreta[20]) {
  sprintf(palavrasecreta, "MELANCIA");
}

int main() {
  char palavrasecreta[20];
  int acertou = 0;
  int enforcou = 0;
  char chutes[26]; // por natureza o array é um ponteiro que aponta para o primeiro elemento do array
  int tentativas = 0;

  abertura();
  escolhepalavra(palavrasecreta);
  do {
    desenhaforca(palavrasecreta, tentativas, chutes);
    chuta(chutes, &tentativas);
  } while (!acertou && !enforcou);
}