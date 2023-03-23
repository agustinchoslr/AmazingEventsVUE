//este código de las stats no fue pasado a VUE

fetch('https://mindhub-xj03.onrender.com/api/amazing').then(response => response.json()).then(data => {
  // console.log(data.events)

  const currentDate = new Date(data.currentDate);
  // let events = data.events;

  function getEventsStats(events) {
    const highestAttendance = events
      .filter(event => event.assistance != null) // Filtrar solo los eventos con assistance no nulo
      .sort((a, b) => {
        const attendanceA = a.assistance / a.capacity || 0;
        const attendanceB = b.assistance / b.capacity || 0;
        return attendanceB - attendanceA;
      })
      .slice(0, 1).map(event => {
        const attendancePercentage = (event.assistance != null ? event.assistance / event.capacity : 0) * 100;
        return { ...event, attendancePercentage: attendancePercentage.toFixed(2) };
      });

    const lowestAttendance = events
      .filter(event => event.assistance != null) // Filtrar solo los eventos con assistance no nulo
      .sort((a, b) => {
        const attendanceA = a.assistance / a.capacity || 0;
        const attendanceB = b.assistance / b.capacity || 0;
        return attendanceA - attendanceB;
      })
      .slice(0, 1).map(event => {
        const attendancePercentage = (event.assistance != null ? event.assistance / event.capacity : 0) * 100;
        return { ...event, attendancePercentage: attendancePercentage.toFixed(2) };
      });

    // const totalCapacity = events.reduce((total, event) => total + event.capacity, 0);
    // const totalAttendance = events.reduce((total, event) => {
    //   return total + (event.assistance != null ? event.assistance : 0);
    // }, 0);
    const largestCapacity = events.sort((a, b) => b.capacity - a.capacity).slice(0, 1);
    // const attendancePercentage = (totalAttendance === 0) ? 0 : totalAttendance / totalCapacity * 100;
    return {
      highestAttendance,
      lowestAttendance,
      largestCapacity,
      // attendancePercentage
    };
  }

  console.table(getEventsStats(data.events).highestAttendance, ['name', 'attendancePercentage']);
  console.table(getEventsStats(data.events).lowestAttendance, ['name', 'attendancePercentage']);
  console.table(getEventsStats(data.events).largestCapacity, ['name', 'capacity']);

  // creando tabla 1

  const stats = getEventsStats(data.events);

  const highestAttendanceTd = document.getElementById("highestAttendance");
  const lowestAttendanceTd = document.getElementById("lowestAttendance");
  const largestCapacityTd = document.getElementById("largestCapacity");
  highestAttendanceTd.textContent = stats.highestAttendance[0].name + " - " + stats.highestAttendance[0].attendancePercentage + "%";
  lowestAttendanceTd.textContent = stats.lowestAttendance[0].name + " - " + stats.lowestAttendance[0].attendancePercentage + "%";
  largestCapacityTd.textContent = stats.largestCapacity[0].name + " - " + stats.largestCapacity[0].capacity;

// fin tabla 1


  function getUpcomingEventsStaticsByCategory(events) {
    const categories = [...new Set(events.map(event => event.category))];
    const statsByCategory = categories.map(category => {
      const categoryEvents = events.filter(event => event.category === category);
      const totalCapacity = categoryEvents.reduce((total, event) => total + event.capacity, 0);
      const totalAttendance = categoryEvents.reduce((total, event) => {
        return total + (event.assistance != null ? event.assistance : 0);
      }, 0);
      const totalRevenue = categoryEvents.reduce((total, event) => {
        if (event.assistance != null) {
          return total + (event.assistance * event.price);
        } else
          return total;
      }, 0);
      const attendancePercentage = (totalAttendance === 0) ? 0 : totalAttendance / totalCapacity * 100;
      return {
        category,
        revenue: totalRevenue,
        attendancePercentage: attendancePercentage.toFixed(2)
      };
    });
    return statsByCategory;
  }
  console.table(getUpcomingEventsStaticsByCategory(data.events))


//creando tabla 2

creatingTabla2() 

function creatingTabla2() {
  const table = document.getElementById("upcomingStats-Container");
  const stats = getUpcomingEventsStaticsByCategory(data.events);
 
  for (let i = 0; i < stats.length; i++) {
    const row = table.insertRow();
    const categoryCell = row.insertCell();
    const revenueCell = row.insertCell();
    const attendanceCell = row.insertCell();
    categoryCell.innerHTML = stats[i].category;
    revenueCell.innerHTML = stats[i].revenue;
    attendanceCell.innerHTML = stats[i].attendancePercentage + "%";
  }
}

// fin tabla 2



  function getPastEventsStaticsByCategory(events) {
    const categories = [...new Set(events.map(event => event.category))];
    const currentDate = new Date(data.currentDate);
    const statsByCategory = categories.map(category => {
      const categoryEvents = events.filter(event => event.category === category);
      const pastEvents = categoryEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate < currentDate;
      });
      const totalCapacity = pastEvents.reduce((total, event) => total + event.capacity, 0);
      const totalAttendance = pastEvents.reduce((total, event) => {
        return total + (event.assistance != null ? event.assistance : 0);
      }, 0);
      const totalRevenue = pastEvents.reduce((total, event) => {
        if (event.assistance != null) {
          return total + (event.assistance * event.price);
        } else
          return total;
      }, 0);
      const attendancePercentage = (totalAttendance === 0) ? 0 : totalAttendance / totalCapacity * 100;
      return {
        category,
        revenue: totalRevenue,
        attendancePercentage: attendancePercentage.toFixed(2)
      };
    });
    return statsByCategory;
  }

  console.table(getPastEventsStaticsByCategory(data.events));

// comienzo tabla 3

creatingTabla3() 

function creatingTabla3() {
  const table = document.getElementById("pastEvents-table");
  const stats = getPastEventsStaticsByCategory(data.events);
 
  for (let i = 0; i < stats.length; i++) {
    const row = table.insertRow();
    const categoryCell = row.insertCell();
    const revenueCell = row.insertCell();
    const attendanceCell = row.insertCell();
    categoryCell.innerHTML = stats[i].category;
    revenueCell.innerHTML = stats[i].revenue;
    attendanceCell.innerHTML = stats[i].attendancePercentage + "%";
  }
}

})
  // .catch(error => console.error("Se produjo el siguiente error: " + error));


// % Revenues de cada categoría: (SUMA de:  (precio x asistencia de cada evento)):
// (Σ (p * a))




