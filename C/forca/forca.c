#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#include "forca.h"

// variáveis globais
char palavrasecreta[20];
char chutes[26]; // por natureza o array é um ponteiro que aponta para o primeiro elemento do array
int chutesdados = 0;

void abertura() {
  printf("*************************************\n");
  printf("*    Bem-vindo ao jogo da forca!    *\n");
  printf("*************************************\n\n");
}

void chuta() {
  printf("\n");
  char chute;
  scanf(" %c", &chute); // precisa do espaço para não ler o enter
  chutes[chutesdados] = chute;
  chutesdados++;
}

void desenhaforca() {
  for (int i = 0; strlen(palavrasecreta) > i; i++) {
    int achou = jachutou(palavrasecreta[i]);
    if (achou) {
      printf("%c ", palavrasecreta[i]);
    } else {
      printf("_ ");
    }
  }
}

void escolhepalavra() {
  FILE* f;
  f = fopen("palavras.txt", "r");

  if (f == 0) {
    printf("Desculpe, banco de dados não disponível\n\n");
    exit(1);
  }
  
  int qtddepalavras;
  fscanf(f, "%d", &qtddepalavras);

  srand(time(0));
  int randomico = rand() % qtddepalavras;

  for (int i = 0; i < randomico; i++) {
    fscanf(f, "%s", palavrasecreta);
  }

  fclose(f);
}

int jachutou(char letra) {
  int achou = 0;
  for (int j = 0; j < chutesdados; j++) {
    if (chutes[j] == letra) {
      achou = 1;
      break;
    }
  }
  return achou;
}

int acertou() {
  for(int i = 0; strlen(palavrasecreta) > i; i++) {
    if (!jachutou(palavrasecreta[i])) return 0;
  }
  return 1;
}

int enforcou() {
  int erros = 0;
  for (int i = 0; chutesdados > i; i++) {
    if (!jachutou(palavrasecreta[i])) erros++;
  }
  return erros >= 5;
}

int main() {
  abertura();
  escolhepalavra();
  do {
    desenhaforca();
    chuta();
  } while (!acertou() && !enforcou());
}