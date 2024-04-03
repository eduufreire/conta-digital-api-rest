# Nova Conta Digital Dock

# Requisitos
- Deve ser possível criar e remover portadores
    - Um portador deve conter apenas seu nome completo e CPF
    - O CPF deve ser válido e único no cadastro de portadores

- As contas digital Dock devem conter as seguintes funcionalidades:
    - A conta deve ser criada utilizando o CPF do portador
    - Uma conta deve ter seu saldo, número e agência disponíveis para consulta
    - Necessário ter funcionalidade para fazer a consulta de extrato da conta por período
    - Um portador pode fechar a conta digital Dock a qualquer instante
    - Executar as operações de saque e depósito:
        - Depósito é liberado para todas as contas ativas e desbloqueadas
        - Saque é permitido para todas as contas ativas e desbloqueadas desde que haja saldo disponível e não ultrapasse o limite diário de 2 mil reais

- Precisamos bloquear e desbloquear a conta digital Dock a qualquer momento
- A conta digital Dock nunca poderá ter o saldo negativo


# Todo
- [x] Criar script do banco
- [ ] Criar endpoints PORTADORES
- [ ] Criar endpoints CONTAS
- [ ] Criar endpoints TRANSAÇÕES