import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const DashboardVendas = () => {
  const [taCarregando, setTaCarregando] = useState(true);
  const [dados, setDados] = useState({});

  const inventarDados = () => {
    const vendasMensais = [
      ['Mês', 'Vendas'],
      ['Jan', 125430],
      ['Fev', 118200],
      ['Mar', 142800],
      ['Abr', 135100],
      ['Mai', 158900],
      ['Jun', 168400]
    ];

    const topProdutos = [
      ['Produto', 'Quantidade'],
      ['iPhone 15', 15600],
      ['Galaxy S24', 14200],
      ['iPad 10a geração', 9800],
      ['MacBook Air', 7200],
      ['AirPods 3', 16800]
    ];

    const mixCategorias = [
      ['Categoria', 'Participação'],
      ['Celulares', 38],
      ['Computadores', 25],
      ['Tablets', 18],
      ['Acessórios', 12],
      ['Áudio', 7]
    ];

    return {
      vendas: vendasMensais,
      produtos: topProdutos,
      categorias: mixCategorias
    };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const dadosFake = inventarDados();
      setDados(dadosFake);
      setTaCarregando(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const configLinha = {
    title: 'Vendas Mensais 2024',
    hAxis: { title: 'Meses' },
    vAxis: { 
      title: 'Valor (R$)',
      format: 'currency'
    },
    colors: ['#3366cc'],
    legend: { position: 'none' }
  };

  const configBarras = {
    title: 'Produtos Mais Vendidos',
    hAxis: { title: 'Unidades' },
    colors: ['#4caf50'],
    legend: { position: 'none' }
  };

  const configPizza = {
    title: 'Participação nas Vendas',
    pieHole: 0.3,
    colors: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff']
  };

  if (taCarregando) {
    return (
      <div style={estilos.telaCarregamento}>
        <div style={estilos.bolinhaGirando}></div>
        <p>Preparando os relatórios...</p>
      </div>
    );
  }

  return (
    <div style={estilos.pagina}>
      
      <header style={estilos.cabecalho}>
        <h1 style={estilos.tituloPrincipal}>Relatório de Vendas</h1>
        <p style={estilos.subtitulo}>Dados do primeiro semestre de 2025</p>
      </header>

      <div style={estilos.areaGraficos}>
        
        <div style={estilos.card}>
          <div style={estilos.tituloCard}>
            <h3>Evolução das Vendas</h3>
            <span style={estilos.badge}>Mensal</span>
          </div>
          <Chart
            chartType="LineChart"
            data={dados.vendas}
            options={configLinha}
            width="100%"
            height="280px"
          />
          <div style={estilos.rodapeCard}>
            <span>Total: R$ 849.830</span>
          </div>
        </div>

        <div style={estilos.card}>
          <div style={estilos.tituloCard}>
            <h3>Ranking de Produtos</h3>
            <span style={estilos.badge}>Top 5</span>
          </div>
          <Chart
            chartType="BarChart"
            data={dados.produtos}
            options={configBarras}
            width="100%"
            height="280px"
          />
          <div style={estilos.rodapeCard}>
            <span>Total: 63.800 unidades</span>
          </div>
        </div>

        <div style={estilos.card}>
          <div style={estilos.tituloCard}>
            <h3>Distribuição por Tipo</h3>
            <span style={estilos.badge}>Mix</span>
          </div>
          <Chart
            chartType="PieChart"
            data={dados.categorias}
            options={configPizza}
            width="100%"
            height="280px"
          />
          <div style={estilos.rodapeCard}>
            <span>Celulares lideram com 38%</span>
          </div>
        </div>

      </div>

      <footer style={estilos.rodape}>
        <p>Atualizado em: {new Date().toLocaleDateString('pt-BR')} | Desenvolvido para disciplina de Front-end</p>
      </footer>

    </div>
  );
};

const estilos = {
  pagina: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '15px',
    fontFamily: 'Arial, Helvetica, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh'
  },
  cabecalho: {
    textAlign: 'center',
    marginBottom: '25px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  tituloPrincipal: {
    color: '#2c3e50',
    marginBottom: '5px',
    fontSize: '24px'
  },
  subtitulo: {
    color: '#7f8c8d',
    fontSize: '14px',
    margin: 0
  },
  areaGraficos: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px',
    marginBottom: '25px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '6px',
    padding: '15px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    border: '1px solid #eee'
  },
  tituloCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '1px solid #ecf0f1'
  },
  badge: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '3px 8px',
    borderRadius: '10px',
    fontSize: '11px'
  },
  rodapeCard: {
    marginTop: '10px',
    paddingTop: '10px',
    borderTop: '1px solid #f1f1f1',
    textAlign: 'center',
    fontSize: '13px',
    color: '#666'
  },
  telaCarregamento: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    color: '#555'
  },
  bolinhaGirando: {
    width: '35px',
    height: '35px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #3498db',
    borderRadius: '50%',
    animation: 'girar 1s linear infinite',
    marginBottom: '15px'
  },
  rodape: {
    textAlign: 'center',
    padding: '15px',
    fontSize: '12px',
    color: '#95a5a6',
    borderTop: '1px solid #ecf0f1'
  }
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes girar {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default DashboardVendas;