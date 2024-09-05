export const POSTS = [
	{
		_id: "1",
		text: "please help me, my house on fire",
		img: "/posts/terbakar.jpeg",
		user: {
			username: "Ahmad",
			profileImg: "/avatars/men1.png",
			fullName: "Ahmad",
		},
		comments: [
			{
				_id: "1",
				text: "Im nearby, will help you",
				user: {
					username: "Aini",
					profileImg: "/avatars/perempuan.jpeg",
					fullName: "Aini",
				},
			},
		],
		likes: ["6658s891", "6658s892", "6658s893", "6658s894"],
	},
	{
		_id: "2",
		text: " Anyone, near Kuantan, there is a victim at Sungai Isap that need help",
		user: {
			username: "Aiman",
			profileImg: "/avatars/men2.png",
			fullName: "Hakim",
		},
		comments: [
			{
				_id: "1",
				text: "Hey im nearby, who need help now?",
				user: {
					username: "Zarina",
					profileImg: "/avatars/girl2.png",
					fullName: "Zarina",
				},
			},
		],
		likes: ["6658s891", "6658s892", "6658s893", "6658s894"],
	},
	{
		_id: "3",
		text: " Guys, i need two more volunteers to help me earthquake victim",
		img: "/posts/tanah runtuh.jpeg",
		user: {
			username: "Yati",
			profileImg: "/avatars/women1.png",
			fullName: "Yati",
		},
		comments: [],
		likes: ["6658s891", "6658s892", "6658s893", "6658s894", "6658s895", "6658s896"],
	},
	{
		_id: "4",
		text: "im stuck, im pregnant woman ,the rood is flood, help me, anyone? 🤔",
		img: "/posts/mengandung.jpeg",
		user: {
			username: "Arifah",
			profileImg: "/avatars/women2.png",
			fullName: "Arifah",
		},
		comments: [
			{
				_id: "1",
				text: "the pregnant woman has been saved, thank you everyone",
				user: {
					username: "Lann",
					profileImg: "/avatars/girl3.png",
					fullName: "Lann",
				},
			},
		],
		likes: [
			"6658s891",
			"6658s892",
			"6658s893",
			"6658s894",
			"6658s895",
			"6658s896",
			"6658s897",
			"6658s898",
			"6658s899",
		],
	},
];

export const USERS_FOR_RIGHT_PANEL = [
	{
		_id: "1",
		fullName: "John Doe",
		username: "johndoe",
		profileImg: "/avatars/boy2.png",
	},
	{
		_id: "2",
		fullName: "Jane Doe",
		username: "janedoe",
		profileImg: "/avatars/girl1.png",
	},
	{
		_id: "3",
		fullName: "Bob Doe",
		username: "bobdoe",
		profileImg: "/avatars/boy3.png",
	},
	{
		_id: "4",
		fullName: "Daisy Doe",
		username: "daisydoe",
		profileImg: "/avatars/girl2.png",
	},
];