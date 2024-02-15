type name = {
    male: string[],
    female: string[]
}

const usa: name = {
    male: ["Logan", "Ethan", "Noah", "Michael", "Daniel", "James", "Liam", "Benjamin", "Matthew", "William",
        "Alexander", "Jackson", "David", "Jacob", "Oliver", "Lucas", "John", "Mason", "Elijah", "Carter", "Aiden",
        "Jayden", "Gabriel", "Nathan", "Nicholas"],
    female: ["Emma", "Ava", "Sophia", "Olivia", "Isabella", "Mia", "Amelia", "Charlotte", "Harper", "Evelyn",
        "Abigail", "Emily", "Elizabeth", "Sofia", "Madison", "Avery", "Ella", "Scarlett", "Grace", "Chloe",
        "Victoria", "Lily", "Aria", "Natalie", "Zoe"]
}
const russia: name = {
    male: ["Александр", "Дмитрий", "Андрей", "Сергей", "Михаил", "Иван", "Юрий", "Артем", "Николай",
        "Владимир", "Павел", "Максим", "Константин", "Егор", "Алексей", "Игорь", "Григорий", "Олег", "Роман",
        "Василий", "Тимур", "Евгений", "Виктор", "Станислав", "Борис"],
    female: ["Анастасия", "Екатерина", "Ольга", "Татьяна", "Мария", "Алина", "Виктория", "Наталья", "Юлия",
        "Елена", "Светлана", "Ирина", "Анна", "Евгения", "Дарья", "Валентина", "Евдокия", "Зоя", "София",
        "Людмила", "Ангелина", "Вера", "Галина", "Милана", "Раиса"]
}
const japan: name = {
    male: ["太郎", "健太", "一郎", "雅彦", "隆太", "慎太郎", "啓太", "大輔", "勇太", "大樹", "悠太", "直樹", "裕太",
        "拓海", "尚樹", "哲也", "康平", "颯太", "俊介", "浩太", "優斗", "海斗", "悠斗", "和也", "優太"],
    female: ["美咲", "優子", "花子", "麻衣", "明美", "恵子", "愛子", "さくら", "瞳", "真紀", "奈々", "絵美", "莉子",
        "純子", "麻美", "千鶴", "希美", "香織", "和子", "彩子", "愛美", "咲子", "桃子", "美和", "みゆき"]
}

const names = {
    usa: usa,
    russia: russia,
    japan: japan
}

export default names;
