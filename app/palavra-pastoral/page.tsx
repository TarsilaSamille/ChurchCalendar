import React from "react"
import { Wheat } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PalavraPastoral() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Wheat className="w-8 h-8 text-[#808000]" />
          <h2 className="text-[3rem] font-serif tracking-tight text-[#8B7355]">IEADESGA</h2>
          <Wheat className="w-8 h-8 text-[#808000]" />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xl text-[#C4A484]">2025</p>
          <p className="text-2xl font-serif text-[#808000] mt-2">Ano da Colheita</p>
        </div>
      </div>

      <h1 className="text-3xl font-serif text-[#8B7355] mb-8 text-center">Palavra Pastoral</h1>

      <div className="space-y-6 text-[#8B7355]">
        <p>
          Ano 2025 chegou, trazendo consigo Esperança de dias melhores. Não tem sido fácil, mas, podemos dizer: Até aqui
          nos ajudou o Senhor. O ano que passou como os anteriores, foi de muitas lutas, perdas e novos desafios, um
          verdadeiro aprendizado para todos nós, mas, também foi um ano de conquistas e vitórias. Deus tem muitos meios
          de dar vitória ao seu povo e de revelar sua vontade ao seus escolhidos, de ensinar, levando-os a realizar seus
          propósitos e a obter a maturidade espiritual necessária para experimentarem o cumprimento das promessas que
          Ele lhes fez.
        </p>
        <p>
          Um desse meios é o sofrimento. Embora o sofrimento seja doloroso e muitas vezes difícil de compreender, a
          Bíblia nos ensina que Deus pode usar o sofrimento para nos moldar e nos transformar. Ele pode nos ensinar
          lições valiosas, fortalecer nossa fé e nos tornar mais compassivos e solidários com os outros.
        </p>
        <p>
          Ao encontrar propósito no sofrimento, somos capazes de crescer e amadurecer espiritualmente. Paulo falou: Rm.
          8.18,19; II Co 4.17
        </p>
        <p>
          Estamos iniciando o 11º ano, em São Gonçalo do Amarante, ano da colheita, com o nosso coração cheio de
          Esperança, com a confiança renovada, a nossa fé fortalecida no Senhor nosso Deus, que tem realizado grandes e
          preciosas promessas, por isso, a nossa Gratidão, por tudo que Ele tem feito em nossa vida, e na vida de toda
          igreja e continuará fazendo com certeza durante esse ano que se inicia. Afirmamos que, a nossa fé não diz
          respeito ao que somos ao que temos nem ao que sabemos; mas sim ao que Ele é, ao que Ele faz, está fazendo e
          ainda fará!
        </p>
        <p>
          Precisamos reconhecer que, como árvores que somos, estamos sendo podados por Deus, o excelente lavrador, nesse
          processo divino de enraizamento profundo e crescimento espiritual, conforme; João 15.1-16, e que as perdas que
          tivemos e as lições aprendidas, possam servir para o nosso crescimento e maturidade espiritual, e possamos
          colher muitos frutos, neste ano que é, o ano da Colheita.
        </p>
        <p>
          Nessa agenda, estão contidas as principais atividades planejadas para 2025, a serem desenvolvidas pela
          Administração Geral, Igrejas Filias, Congregações, e Departamentos.
        </p>
        <p>
          Planejando de forma elaborada, e tendo a participação e compreenção de todos, os resultados dessa colheita
          serão incalculáveis para o reino de Deus, e atingiremos os objetivos que estamos propondo para 2025.
        </p>
        <p>
          Com a participação e envolvimento, bem como o comprometimento de todos os pastores e líderes de departamentos,
          na realização das atividades de modo integrado, visando atingir os objetivos e metas propostas pela
          Administração da Igreja.
        </p>
        <p>
          Esperamos em Deus, que, planejando as atividades, e levando em conta as prioridades da igreja, teremos a sua
          benção na execução; com certeza alcançaremos os objetivos almejados, esta é a nossa Certeza! Para a nossa
          meditação;
        </p>
        <p className="italic">
          "Eis que eu vos digo: Levantai os vossos olhos, e vede as terras, que já estão brancas para a Colheita". João
          4.35
        </p>
        <p className="text-right mt-4">
          São Gonçalo do Amarante - RN,
          <br />
          02 de Janeiro de 2025
        </p>
        <p className="text-right font-semibold">
          Abner Alves de Sousa
          <br />
          Pastor Supervisor
        </p>
      </div>

      <div className="mt-12 text-center">
        <Link href="/">
          <Button variant="outline" className="bg-[#8B7355] text-white hover:bg-[#8B7355]/90">
            Voltar para o Calendário
          </Button>
        </Link>
      </div>
    </div>
  )
}

