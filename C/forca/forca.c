#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#include "forca.h"

// variáveis globais
char palavrasecreta[TAMANHO_PALAVRA];
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

int chuteserrados() {
  int erros = 0;
  for (int i = 0; chutesdados > i; i++) {
    if (!jachutou(palavrasecreta[i])) erros++;
  }
  return erros;
}

void desenhaforca() {
  int erros = chuteserrados();

  printf("  _______      \n");
  printf(" |/      |     \n");
  printf(" |      %c%c%c \n", (erros >= 1 ? '(' : ' '), 
                              (erros >= 1 ? '_' : ' '), 
                              (erros >= 1 ? ')' : ' '));

  printf(" |      %c%c%c \n", (erros >= 3 ? '\\' : ' '), 
                              (erros >= 2 ? '|' : ' '),
                              (erros >= 3 ? '/' : ' '));

  printf(" |       %c    \n", (erros >= 2 ? '|' : ' '));

  printf(" |      %c %c  \n", (erros >= 4 ? '/' : ' '), 
                              (erros >= 4 ? '\\' : ' '));
  printf(" |             \n");
  printf("_|___          \n");
  printf("\n\n");

  for (int i = 0; strlen(palavrasecreta) > i; i++) {
    int achou = jachutou(palavrasecreta[i]);
    if (achou) {
      printf("%c ", palavrasecreta[i]);
    } else {
      printf("_ ");
    }
  }
}

void adicionapalavra() {
  char quer;
  printf("Você quer adicionar uma nova palavra no jogo? (S/N) ");
  scanf(" %c", &quer);
  if (quer == 'S' || quer == 's') {
    char novapalavra[TAMANHO_PALAVRA];
    printf("Digite a nova palavra: ");
    scanf(" %s", novapalavra);

    FILE* f;
    f = fopen("palavras.txt", "r+");
    if (f == 0) {
      printf("Desculpe, banco de dados não disponível\n\n");
      exit(1);
    }

    // adicionar +1 para o tamanho de palavras disponiveis no txt
    int qtd;
    fscanf(f, "%d", &qtd);
    qtd++;

    // mudar a posição da leitura/escrita para o inicio do arquivo
    fseek(f, 0, SEEK_SET);
    
    // escrever a nova qtd de palavras disponiveis
    fprintf(f, "%d", qtd);
    
    // mudar a posição da leitura/escrita para o final do arquivo
    fseek(f, 0, SEEK_END);
    
    // escrever a nova palavra
    fprintf(f, "\n%s", novapalavra);

    fclose(f);
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

int ganhou() {
  for(int i = 0; strlen(palavrasecreta) > i; i++) {
    if (!jachutou(palavrasecreta[i])) return 0;
  }
  return 1;
}

int enforcou() {
  return chuteserrados() >= 5;
}

int main() {
  abertura();
  escolhepalavra();
  do {
    desenhaforca();
    chuta();
  } while (!ganhou() && !enforcou());
  // adicionapalavra();

  if(ganhou()) {
    printf("\nParabéns, você ganhou!\n\n");

    printf("       ___________      \n");
    printf("      '._==_==_=_.'     \n");
    printf("      .-\\:      /-.    \n");
    printf("     | (|:.     |) |    \n");
    printf("      '-|:.     |-'     \n");
    printf("        \\::.    /      \n");
    printf("         '::. .'        \n");
    printf("           ) (          \n");
    printf("         _.' '._        \n");
    printf("        '-------'       \n\n");
  } else {
    printf("\nPuxa, você foi enforcado!\n");
    printf("A palavra era **%s**\n\n", palavrasecreta);

    printf("    _______________         \n");
    printf("   /               \\       \n"); 
    printf("  /                 \\      \n");
    printf("//                   \\/\\  \n");
    printf("\\|   XXXX     XXXX   | /   \n");
    printf(" |   XXXX     XXXX   |/     \n");
    printf(" |   XXX       XXX   |      \n");
    printf(" |                   |      \n");
    printf(" \\__      XXX      __/     \n");
    printf("   |\\     XXX     /|       \n");
    printf("   | |           | |        \n");
    printf("   | I I I I I I I |        \n");
    printf("   |  I I I I I I  |        \n");
    printf("   \\_             _/       \n");
    printf("     \\_         _/         \n");
    printf("       \\_______/           \n");
  }
}