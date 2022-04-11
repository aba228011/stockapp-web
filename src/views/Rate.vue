<template>
  <div>
    <b-card header="Выберите тариф" style="font-weight: bold">
      <b-list-group>
        <b-list-group-item href="#">Без абонентской платы
          <br/>
          <small>Тариф без абонентской платы подойдет тем, кто не собирается активно торговать.</small>
        </b-list-group-item>
        <b-list-group-item href="#">С абонентской платы
          <br/>
          <small>В тариф с абонентской платой уже включен достаточно высокий ежемесячный объем сделок.</small>
        </b-list-group-item>
      </b-list-group>
      <p></p>
      <b-card-group deck bg- style="font-weight: bolder">
        <b-card bg-variant="white" header="Premium" class="text-center">
            <b-card-text class="b-card-text text-left lead">
              0.тнг в месяц <br/>
              Без абоненсткой платы <br/>
              Акции, облигации и другие ЦБ <br/>
              Казахстан: 0.2 % минимум за сделку <br/>
              Маржинальное кредитование: 14%-16% <br/>
              SMS оповещение: 1 тенге <br/>
              Этот тариф подходит для долгосрочных инвесторов, которым необходим максимальный сервис и удобство в работе.
            </b-card-text>
          <p/>
          <b-button variant="danger" class="text-center">Выбрать тарифный план Premium</b-button>
        </b-card>

        <b-card bg-variant="white" header="Balance" class="text-center">
          <b-card-text class="b-card-text text-left lead">
              3000 тнг. в месяц <br/>
              С абоненсткой платы <br/>
              Акции, облигации и другие ЦБ <br/>
              Казахстан: 0.045 % минимум за сделку <br/>
              Маржинальное кредитование: 14%-16% <br/>
              SMS оповещение: 1 тенге <br/>
              Если вы активный спекулянт, тогда этот тариф для Вас
            </b-card-text>
          <p/>
          <b-button variant="danger" class="text-center">Выбрать тарифный план Balance</b-button>
        </b-card>
      </b-card-group>
    </b-card>
  </div>
</template>

<script>

</script>
