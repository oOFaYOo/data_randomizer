type surname = {
    male: string[],
    female: string[]
}

const _usa: string[] = ["Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
    "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
    "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright",
    "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Nelson", "Carter", "Mitchell", "Perez", "Roberts",
    "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins"];
const _japan: string[] = ["佐藤", "鈴木", "高橋", "田中", "伊藤", "渡辺", "山本", "中村", "小林", "斎藤", "加藤", "吉田",
    "山田", "佐々木", "山口", "松本", "井上", "木村", "林", "清水", "山崎", "中島", "池田", "阿部", "森", "長谷川", "後藤",
    "石川", "近藤", "藤田", "岡田", "西村", "岡本", "村上", "武田", "大野", "小川", "桜井", "吉村", "新井", "齋藤", "佐野",
    "高木", "野口", "松田", "菅原", "小野", "成田"];
const russia: surname = {
    male: ["Петров", "Иванов", "Смирнов", "Кузнецов", "Васильев", "Михайлов", "Новиков", "Федоров", "Морозов",
        "Соколов", "Попов", "Лебедев", "Алексеев", "Семенов", "Егоров", "Павлов", "Козлов", "Степанов", "Николаев",
        "Орлов", "Андреев", "Макаров", "Никитин", "Захаров"],
    female: ["Романова", "Виноградова", "Беляева", "Крылова", "Максимова", "Королева", "Авдеева", "Красильникова",
        "Трофимова", "Филатова", "Фомина", "Журавлева", "Александрова", "Сидорова", "Дмитриева", "Горбунова",
        "Калинина", "Кирсанова", "Мельникова", "Родина", "Рябова", "Савельева", "Соловьева", "Тимофеева"]
};

const japan: surname = {
    male: _japan,
    female: _japan
}
const usa: surname = {
    male: _usa,
    female: _usa
}

export {
    usa,
    russia,
    japan
}