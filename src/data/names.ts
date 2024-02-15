type name = {
    male: string[],
    female: string[]
}

const usa: name = {
    male: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Charles", "Thomas",
        "Daniel", "Matthew", "Anthony", "Donald", "Steven", "Paul", "Andrew", "Joshua", "Kenneth", "George",
        "Kevin", "Brian", "Edward", "Ronald", "Timothy", "Jason", "Jeffrey", "Ryan", "Gary", "Nicholas", "Eric",
        "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon", "Frank", "Benjamin", "Gregory", "Samuel",
        "Raymond", "Patrick", "Alexander", "Jack", "Dennis", "Jerry", "Tyler", "Aaron", "Jose", "Henry", "Adam",
        "Arthur", "Zachary", "Carl", "Nathan", "Albert", "Kyle", "Lawrence", "Joe", "Willie", "Christian", "Bryan",
        "Peter", "Eugene", "Roy", "Jordan", "Ralph", "Roy", "Jordan", "Ralph", "Roy", "Jordan", "Ralph", "Roy", "Jordan",
        "Ralph", "Vincent", "Russell", "Dylan", "Alan", "Wayne", "Juan", "Louis", "Leonard", "Jesse", "Bradley", "Derek",
        "Mildred", "Jordan", "Leonard", "Jesse", "Bradley", "Derek"],
    female: ["Emily", "Emma", "Olivia", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia", "Harper", "Evelyn",
        "Abigail", "Ella", "Elizabeth", "Sofia", "Madison", "Avery", "Luna", "Grace", "Chloe", "Scarlett", "Zoe", "Lily",
        "Mila", "Aria", "Eleanor", "Hannah", "Nora", "Layla", "Penelope", "Riley", "Leah", "Audrey", "Stella", "Claire",
        "Bella", "Aurora", "Lucy", "Anna", "Samantha", "Caroline", "Genesis", "Lillian", "Aaliyah",
        "Maya", "Kennedy", "Hailey", "Ellie"]
}
const russia: name = {
    male: ["Александр", "Дмитрий", "Андрей", "Сергей", "Михаил", "Иван", "Юрий", "Артем", "Николай",
        "Владимир", "Павел", "Максим", "Константин", "Егор", "Алексей", "Игорь", "Григорий", "Олег", "Роман",
        "Василий", "Тимур", "Евгений", "Виктор", "Станислав", "Борис"],
    female: ["Алёна", "Алина", "Алиса", "Алла", "Анастасия", "Ангелина", "Анжела", "Анжелика", "Анна", "Антонина",
        "Анфиса", "Арина", "Валентина", "Валерия", "Варвара", "Василиса", "Вера", "Вероника", "Виктория", "Галина",
        "Дарина", "Дарья", "Ева", "Евгения", "Екатерина", "Елена", "Елизавета", "Жанна", "Зинаида", "Злата", "Зоя",
        "Инга", "Инесса", "Инна", "Ирина", "Карина", "Каролина", "Кира", "Клавдия", "Кристина", "Лариса", "Лидия",
        "Лилия", "Любовь", "Людмила", "Маргарита", "Марина", "Мария", "Марта", "Мила", "Милана", "Мирослава", "Надежда",
        "Наталья", "Нина", "Нонна", "Оксана", "Ольга", "Полина", "Раиса", "Регина", "Римма", "Руслана", "Светлана",
        "София", "Таисия", "Тамара", "Татьяна", "Ульяна", "Фаина", "Фёкла", "Фекла", "Фрося", "Феодора", "Христина",
        "Христина", "Цвета", "Цветана", "Чеслава", "Шарлотта", "Шушана", "Щепанка", "Юлиана", "Юлия", "Юнона", "Яна", "Ярослава"]
}
const japan: name = {
    male: ["太郎", "健太", "一郎", "雅彦", "隆太", "慎太郎", "啓太", "大輔", "勇太", "大樹", "悠太", "直樹", "裕太", "拓海",
        "尚樹", "哲也", "康平", "颯太", "俊介", "浩太", "優斗", "海斗", "悠斗", "和也", "優太", "健介", "良太", "大介", "拓也",
        "春樹", "悠介", "慎吾", "誠", "裕介", "勇介", "広大", "祐介", "翔太", "智也", "大吾", "悠希", "蓮", "琉太", "陽斗", "竜也",
        "陽太", "駿太", "亮太", "蒼空"],
    female: ["美咲", "優子", "花子", "麻衣", "明美", "恵子", "愛子", "さくら", "瞳", "真紀", "奈々", "絵美", "莉子", "純子",
        "麻美", "千鶴", "希美", "香織", "和子", "彩子", "愛美", "咲子", "桃子", "美和", "みゆき", "夏美", "葵", "聖子", "真希",
        "亜美", "ひな", "美智子", "ゆうこ", "紗希", "久美子", "さやか", "菜々子", "なつみ", "あやか", "みき", "みさ", "かな",
        "かおり", "みゆ", "美香", "ひかり", "ちひろ", "りか"]
}

const names = {
    usa: usa,
    russia: russia,
    japan: japan
}

export default names;
