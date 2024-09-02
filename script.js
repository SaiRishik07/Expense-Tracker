window.onload = () => {
    const balance = document.getElementById(
        "balance"
    );

    const money_plus = document.getElementById('money-plus');
    const money_minus = document.getElementById('money-minus');
    const list = document.getElementById("list");
    const form = document.getElementById('form');
    const text = document.getElementById('text');
    const amount = document.getElementById('amount');
    const date = document.getElementById('date');
    const viewBtn = document.getElementById('view-btn');
    const view = document.getElementById('view-transaction');

    const localStorageTransactions = JSON.parse(localStorage.getItem("Transactions"));
    let Transactions = localStorage.getItem("Transactions") !== null ? localStorageTransactions : [];



    //Add transaction

    function addTransaction(e) {
        e.preventDefault();
        if (
            text.value.trim() === "" || amount.value.trim() === ""
        ) {
            alert("Please Enter Text And vaLUE");
        } else {
            const transaction = {
                id: generateID(),
                text: text.value,
                amount: +amount.value,
                date: date.value,
            };

            console.log(transaction);

            Transactions.push(transaction);
            addTransactionDOM(transaction);
            updateLocalStorage();
            updateValues();
            text.value = "";
            amount.value = "";
            date.value = "";
        }

    }

    function generateID() {
        return Math.floor(Math.random() * 100000000);
    }


    function addTransactionDOM(transaction) {
        const sign = transaction.amount < 0 ? "-" : "+";
        const item = document.createElement("li");

        item.classList.add(transaction.amount < 0 ? "minus" : "plus");
        item.innerHTML = `
            ${transaction.text}
            <span>${sign}₹${Math.abs(transaction.amount)}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 delete-btn">
                <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
        `;

        
        item.querySelector(".delete-btn").addEventListener("click", () => removeItem(transaction.id));

        list.appendChild(item);
    }
    function updateValues() {
        const amount = Transactions.map(transaction => transaction.amount);
        const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
        const income = amount.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
        const expense = (amount.filter(item => item < 0).reduce((acc, item) => (acc, item), 0) * -1).toFixed(2);

        balance.innerText = `₹${total}`;
        money_plus.innerText = `₹${income}`;
        money_minus.innerText = `₹${expense}`;

    }

    function removeItem(id) {

        Transactions = Transactions.filter(item => item.id !== id);
        updateLocalStorage();
        Init();
        

    }
    
    function updateLocalStorage() {
        localStorage.setItem(
            "Transactions",
            JSON.stringify(Transactions)
        );
    }

    
    function Init() {
        list.innerHTML = "";
        Transactions.forEach(addTransactionDOM);
        updateValues();

    }

    let result = [];

    viewBtn.addEventListener('click', () => {
       
        let month = document.getElementById('months').value;

        
        let data = localStorage.getItem('Transactions');

       
        data = JSON.parse(data);

       
        data = data.filter((dta) => {
            
            let transactionDate = new Date(dta.date);

           
            let transactionMonth = transactionDate.getMonth();


            let selectedMonthIndex = month - 1;

            
            return transactionMonth === selectedMonthIndex;
        });
       

        
        const tbody = document.getElementById('view-transaction');

       
        tbody.innerHTML = "";
        data.forEach(transaction => {
            
            const row = document.createElement('tr');

            
            const idCell = document.createElement('td');
            idCell.textContent = transaction.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = transaction.text;
            row.appendChild(nameCell);

            const amountCell = document.createElement('td');
            amountCell.textContent = transaction.amount;
            row.appendChild(amountCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = transaction.date;
            row.appendChild(dateCell);

            
            tbody.appendChild(row);
        });

    });

    function viewTransactions(month) {
        
        console.log(month);

        console.log(Transactions[0].date);

    }
    Init();

    form.addEventListener("submit", addTransaction);

}