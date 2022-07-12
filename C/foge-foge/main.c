#include <stdio.h>
#include <stdlib.h>
#include "main.h"

char** mapa;
int linhas;
int colunas;

void liberamapa() {
  // free -> liberta a memoria alocada dinamicamente
  for (int i = 0; i < linhas; i++) {
    free(mapa[i]);
  }
  free(mapa);
}

void alocamapa() {
  // alocar memoria para o mapa (linhas x colunas) -> alocação dinamica de memoria
  mapa = malloc(sizeof(char*) * linhas);
  for (int i = 0; i < linhas; i++) {
    mapa[i] = malloc(sizeof(char) * (colunas + 1));
  }
}

void lemapa() {
  FILE* f;
  f = fopen("mapa.txt", "r");
  if (f == 0) {
    printf("Erro na leitura do mapa\n");
    exit(1);
  }
  fscanf(f, "%d %d", &linhas, &colunas);
  alocamapa();
  // ler o mapa
  for (int i = 0; i < 5; i++) {
    fscanf(f, "%s", mapa[i]);
  }
  fclose(f);
}

int main() {
  lemapa();

  // imprimir o mapa
  for (int i = 0; i < linhas; i++) {
    printf("%s\n", mapa[i]);
  }

  liberamapa();
}