const accommodationTypeVi = [
  {
    id: 15,
    label: "Căn hộ",
    description:
      "Nơi lưu trú được trang bị đầy đủ cung cấp phòng riêng và nằm trong tòa nhà chung cư.",
    children: [
      {
        id: 17,
        label: "Toàn bộ căn hộ",
        description:
          "Khách sẽ có toàn bộ nơi ở cho riêng mình—họ không cần phải chia sẻ các tiện nghi như phòng tắm, phòng chung và nhà bếp với khách khác.",
      },
      {
        id: 16,
        label: "Phòng riêng",
        description:
          "Khách chỉ có một phòng riêng cho họ. Họ sẽ cần phải chia sẻ phòng chung, nhà bếp hoặc phòng tắm với khách khác/chủ nhà.",
      },
    ],
  },
  {
    id: 1,
    label: "Khách sạn",
    description:
      "Một nơi lưu trú thương mại cung cấp phòng riêng với bữa ăn và dịch vụ cho khách.",
    children: [
      {
        id: 3,
        label: "Chỗ ở kiểu Bed and Breakfast",
        description:
          "Chỗ ở thương mại nhỏ hoặc nhà riêng cung cấp nơi nghỉ qua đêm với bữa sáng.",
      },
      {
        id: 4,
        label: "Khách sạn Capsule",
        description:
          "Đơn vị nhà nghỉ dạng cá nhân cung cấp chỗ ở cơ bản qua đêm.",
      },
      {
        id: 5,
        label: "Nhà khách",
        description:
          "Nơi lưu trú thương mại nhỏ thường được chuyển đổi từ ngôi nhà riêng.",
      },
      {
        id: 6,
        label: "Chỗ ở theo kiểu Homestay",
        description:
          "Một nơi lưu trú ngân sách nơi khách có phòng riêng nhưng phải chia sẻ một số khu vực chung với khách khác.",
      },
      {
        id: 7,
        label: "Nhà trọ",
        description:
          "Nơi lưu trú ngân sách cung cấp chỗ ở, thường là giường dạng ký túc xá.",
      },
      {
        id: 8,
        label: "Khách sạn",
        description:
          "Một nơi lưu trú thương mại cung cấp phòng riêng với bữa ăn và dịch vụ cho khách.",
      },
      {
        id: 9,
        label: "Khu nghỉ dưỡng",
        description:
          "Một quần thể nơi lưu trú cung cấp phòng riêng và các cơ sở vui chơi giải trí.",
      },
      {
        id: 10,
        label: "Riad",
        description:
          "Một ngôi nhà hoặc cung điện truyền thống ở Ma-rốc cung cấp chỗ ở.",
      },
      {
        id: 11,
        label: "Ryokan",
        description:
          "Một ký túc xá truyền thống của Nhật Bản cung cấp chỗ ở kèm theo bữa ăn.",
      },
      {
        id: 2,
        label: "Căn hộ dịch vụ",
        description:
          "Căn hộ được trang bị đầy đủ trong tòa nhà chung cư cung cấp phòng riêng với dịch vụ như ở khách sạn.",
      },
    ],
  },
  {
    id: 12,
    label: "Nhà",
    description:
      "Một ngôi nhà được trang bị đầy đủ cung cấp chỗ ở và được cho thuê làm toàn bộ nơi ở.",
    children: [
      {
        id: 14,
        label: "Toàn bộ ngôi nhà",
        description:
          "Khách sẽ có toàn bộ nơi ở cho riêng mình—họ không cần phải chia sẻ các tiện nghi như phòng tắm, phòng chung và nhà bếp với khách khác.",
      },
      {
        id: 13,
        label: "Phòng riêng",
        description:
          "Khách chỉ có một phòng riêng cho họ. Họ sẽ cần phải chia sẻ phòng chung, nhà bếp hoặc phòng tắm với khách khác/chủ nhà.",
      },
    ],
  },
  {
    id: 18,
    label: "Chỗ ở độc đáo",
    description:
      "Một nơi lưu trú không phổ biến như làm nơi ở như nhà trên thuyền, trại và các loại chỗ ở khác.",
    children: [
      {
        id: 19,
        label: "Khu cắm trại",
        description:
          "Một nơi cung cấp chỗ ở và thường được làm từ cấu trúc tạm thời như lều, trại hoặc túi ngủ.",
      },
      {
        id: 20,
        label: "Nhà trên thuyền",
        description:
          "Một nơi lưu trú thương mại nằm trên thuyền hoặc tàu du lịch.",
      },
    ],
  },
];

const accommodationTypeEn = [
  {
    id: 15,
    label: "Apartment",
    description:
      "Furnished residential that provides private rooms and located in an apartment building.",
    children: [
      {
        id: 17,
        label: "Entire Apartment",
        description:
          "Guests will have the whole place to themselves—they don't have to share facilities with other guests such as bathrooms, common rooms, and kitchen.",
      },
      {
        id: 16,
        label: "Private Room",
        description:
          "Guests will only have a private room for themselves. They will need to share common room, kitchen, or bathroom with other guests/host.",
      },
    ],
  },
  {
    id: 1,
    label: "Hotel",
    description:
      "A commercial accommodation that provides private rooms with meals and guest service.",
    children: [
      {
        id: 3,
        label: "Bed and Breakfast",
        description:
          "Small commercial accommodation or private home that offers overnight stay with breakfast.",
      },
      {
        id: 4,
        label: "Capsule Hotel",
        description:
          "Small unit of capsule accommodation that offers lodging with basic overnight accommodation.",
      },
      {
        id: 5,
        label: "Guest House",
        description:
          "Small commercial accommodation that usually converted from a private house.",
      },
      {
        id: 6,
        label: "Homestay",
        description:
          "A budget accommodation where the guest has private room while sharing some shared areas with other guests.",
      },
      {
        id: 7,
        label: "Hostel",
        description:
          "A budget accommodation that provides lodging, usually with dorm-style beds.",
      },
      {
        id: 8,
        label: "Hotel",
        description:
          "A commercial accommodation that provides private rooms with meals and guest services.",
      },
      {
        id: 9,
        label: "Resort",
        description:
          "A complex of accommodation that offers private rooms and recreational facilities.",
      },
      {
        id: 10,
        label: "Riad",
        description:
          "A traditional Morrocan house or palace that offers accommodation.",
      },
      {
        id: 11,
        label: "Ryokan",
        description:
          "A traditional Japanese inn that offers accommodation with meals.",
      },
      {
        id: 2,
        label: "Serviced Apartment",
        description:
          "Furnished residential in an apartment building that provides private rooms with hotel-like services.",
      },
    ],
  },
  {
    id: 12,
    label: "House",
    description:
      "A furnished house that offers accommodation and is rented out as an entire place.",
    children: [
      {
        id: 14,
        label: "Entire House",
        description:
          "Guests will have the whole place to themselves—they don't have to share facilities such as bathrooms, common rooms, and kitchen with other guests.",
      },
      {
        id: 13,
        label: "Private Room",
        description:
          "Guests will only have a private room for themselves. They will need to share common room, kitchen, or bathroom with other guests/host.",
      },
    ],
  },
  {
    id: 18,
    label: "Unique Accommodation",
    description:
      "A place of stay that is not common to be used as an accommodation, such as boat house, camp, and so on.",
    children: [
      {
        id: 19,
        label: "Campsite",
        description:
          "A place that provides lodging and usually made from temporary structures like hut, camp or tent.",
      },
      {
        id: 20,
        label: "Houseboat",
        description:
          "A commercial accommodation located on a boat or cruise ship.",
      },
    ],
  },
];

export default {
  "GET /partner/general-types/accommodations/:lang": (
    req: Request,
    res: any
  ) => {
    const url = new URL(req.url || "", "http://localhost:8000");
    const lang = url.pathname.split("/")[4];
    let response = {
      data: [] as typeof accommodationTypeEn,
    };
    if (lang == "vi") {
      response.data = accommodationTypeVi;
    } else {
      response.data = accommodationTypeEn;
    }

    return res.status(200).send(response);
  },
};
