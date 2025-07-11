import type { WidgetOption, FlightData, SidebarItem } from "@/lib/types/types"
export interface PetroleumData {
    State: string
    Period: string
    AGO: number
    PMS: number
    DPK: number
    LPG: number
    Region: string
  }
  
  export const petroleumData: PetroleumData[] = [
    { State: "Abia", Period: "2024-11-30", AGO: 1205.63, PMS: 1159.38, DPK: 1342.86, LPG: 1300, Region: "South East" },
    {
      State: "Abuja",
      Period: "2024-11-30",
      AGO: 1352.86,
      PMS: 1084.44,
      DPK: 1150,
      LPG: 1291.67,
      Region: "North Central",
    },
    { State: "Adamawa", Period: "2024-11-30", AGO: 1205, PMS: 1161.67, DPK: 1399.44, LPG: 1325.56, Region: "North East" },
    {
      State: "Akwa Ibom",
      Period: "2024-11-30",
      AGO: 1189.43,
      PMS: 1119.38,
      DPK: 1375,
      LPG: 1368.57,
      Region: "South South",
    },
    { State: "Anambra", Period: "2024-11-30", AGO: 1264.29, PMS: 1141.25, DPK: 1400, LPG: 1500, Region: "South East" },
    { State: "Bauchi", Period: "2024-11-30", AGO: 1302.14, PMS: 1197.5, DPK: 1457.14, LPG: 1400, Region: "North East" },
    { State: "Bayelsa", Period: "2024-11-30", AGO: 1222, PMS: 1150, DPK: 1400, LPG: 1351.67, Region: "South South" },
    { State: "Benue", Period: "2024-11-30", AGO: 1185, PMS: 1152.78, DPK: 1500, LPG: 1450, Region: "North Central" },
    { State: "Borno", Period: "2024-11-30", AGO: 1209.44, PMS: 1181.44, DPK: 1475, LPG: 1333.33, Region: "North East" },
    {
      State: "Cross River",
      Period: "2024-11-30",
      AGO: 1182.5,
      PMS: 1160.75,
      DPK: 1200,
      LPG: 1180,
      Region: "South South",
    },
    { State: "Delta", Period: "2024-11-30", AGO: 1217.5, PMS: 1167.5, DPK: 1480, LPG: 1342.86, Region: "South South" },
    { State: "Ebonyi", Period: "2024-11-30", AGO: 1181.67, PMS: 1197.5, DPK: 1500, LPG: 1290, Region: "South East" },
    { State: "Edo", Period: "2024-11-30", AGO: 1390, PMS: 1146.25, DPK: 1237.5, LPG: 1437.5, Region: "South South" },
    {
      State: "Ekiti",
      Period: "2024-11-30",
      AGO: 1227.78,
      PMS: 1117.78,
      DPK: 1438.29,
      LPG: 1408.33,
      Region: "South West",
    },
    { State: "Enugu", Period: "2024-11-30", AGO: 1231.88, PMS: 1161.25, DPK: 1321.43, LPG: 1425, Region: "South East" },
    { State: "Gombe", Period: "2024-11-30", AGO: 1186.25, PMS: 1136, DPK: 1443.75, LPG: 1381.25, Region: "North East" },
    { State: "Imo", Period: "2024-11-30", AGO: 1225, PMS: 1160.63, DPK: 1347.14, LPG: 1387.5, Region: "South East" },
    { State: "Jigawa", Period: "2024-11-30", AGO: 1270, PMS: 1142.22, DPK: 1425, LPG: 1460, Region: "North West" },
    { State: "Kaduna", Period: "2024-11-30", AGO: 1214.44, PMS: 1122.22, DPK: 1300, LPG: 1266.25, Region: "North West" },
    { State: "Kano", Period: "2024-11-30", AGO: 1277.14, PMS: 1174.88, DPK: 1400, LPG: 1350, Region: "North West" },
    { State: "Katsina", Period: "2024-11-30", AGO: 1194.29, PMS: 1113.75, DPK: 1321.43, LPG: 1376, Region: "North West" },
    { State: "Kebbi", Period: "2024-11-30", AGO: 1272.86, PMS: 1181.25, DPK: 1400, LPG: 1350, Region: "North West" },
    { State: "Kogi", Period: "2024-11-30", AGO: 1170.63, PMS: 1106.88, DPK: 1425, LPG: 1362.5, Region: "North Central" },
    { State: "Kwara", Period: "2024-11-30", AGO: 1275, PMS: 1276.25, DPK: 1225, LPG: 1300, Region: "North Central" },
    { State: "Lagos", Period: "2024-11-30", AGO: 1147.39, PMS: 1060.27, DPK: 1475, LPG: 1216.92, Region: "South West" },
    { State: "Nasarawa", Period: "2024-11-30", AGO: 1185, PMS: 1135, DPK: 1500, LPG: 1300, Region: "North Central" },
    { State: "Niger", Period: "2024-11-30", AGO: 1172, PMS: 1106.25, DPK: 1400, LPG: 1397, Region: "North Central" },
    { State: "Ogun", Period: "2024-11-30", AGO: 1160, PMS: 1061.56, DPK: 1350, LPG: 1314.29, Region: "South West" },
    { State: "Ondo", Period: "2024-11-30", AGO: 1325, PMS: 1162.5, DPK: 1190, LPG: 1530, Region: "South West" },
    { State: "Osun", Period: "2024-11-30", AGO: 1171, PMS: 1085.63, DPK: 1191, LPG: 1425.71, Region: "South West" },
    { State: "Oyo", Period: "2024-11-30", AGO: 1149.5, PMS: 1059.38, DPK: 1310, LPG: 1357.5, Region: "South West" },
    {
      State: "Plateau",
      Period: "2024-11-30",
      AGO: 1394.44,
      PMS: 1155.56,
      DPK: 1311.11,
      LPG: 1316.67,
      Region: "North Central",
    },
    { State: "Rivers", Period: "2024-11-30", AGO: 1341.67, PMS: 1166.25, DPK: 1160, LPG: 1530, Region: "South South" },
    { State: "Sokoto", Period: "2024-11-30", AGO: 1222.86, PMS: 1142.86, DPK: 1300, LPG: 1282.5, Region: "North West" },
    {
      State: "Taraba",
      Period: "2024-11-30",
      AGO: 1215.56,
      PMS: 1142.56,
      DPK: 1581.25,
      LPG: 1337.5,
      Region: "North East",
    },
    { State: "Yobe", Period: "2024-11-30", AGO: 1270, PMS: 1153.33, DPK: 1348.89, LPG: 1196.11, Region: "North East" },
    { State: "Zamfara", Period: "2024-11-30", AGO: 1255, PMS: 1181.25, DPK: 1200, LPG: 1276.25, Region: "North West" },
    { State: "Lagos", Period: "2024-12-01", AGO: 1147.39, PMS: 1060.27, DPK: 1475, LPG: 1216.92, Region: "South West" },
    { State: "Lagos", Period: "2024-12-02", AGO: 1147.69, PMS: 1060.04, DPK: 1475, LPG: 1226.15, Region: "South West" },
    { State: "Lagos", Period: "2024-12-03", AGO: 1147.69, PMS: 1059.61, DPK: 1475, LPG: 1214.62, Region: "South West" },
    { State: "Lagos", Period: "2024-12-04", AGO: 1146.29, PMS: 1059.5, DPK: 1475, LPG: 1214.62, Region: "South West" },
    { State: "Lagos", Period: "2024-12-05", AGO: 1146.47, PMS: 1055.56, DPK: 1475, LPG: 1213.46, Region: "South West" },
    { State: "Abuja", Period: "2024-12-01", AGO: 1340.91, PMS: 1072.86, DPK: 1150, LPG: 1285, Region: "North Central" },
    { State: "Abuja", Period: "2024-12-02", AGO: 1340.91, PMS: 1070.67, DPK: 1150, LPG: 1285, Region: "North Central" },
    {
      State: "Abuja",
      Period: "2024-12-03",
      AGO: 1359.09,
      PMS: 1074.29,
      DPK: 1150,
      LPG: 1276.67,
      Region: "North Central",
    },
    {
      State: "Abuja",
      Period: "2024-12-04",
      AGO: 1354.55,
      PMS: 1074.29,
      DPK: 1150,
      LPG: 1276.67,
      Region: "North Central",
    },
    {
      State: "Abuja",
      Period: "2024-12-05",
      AGO: 1321.29,
      PMS: 1073.46,
      DPK: 1150,
      LPG: 1276.67,
      Region: "North Central",
    },
  ]
  
  // Helper functions to process data
  export function getLatestDataByState() {
    const latestData = new Map()
  
    petroleumData.forEach((item) => {
      const existing = latestData.get(item.State)
      if (!existing || new Date(item.Period) > new Date(existing.Period)) {
        latestData.set(item.State, item)
      }
    })
  
    return Array.from(latestData.values())
  }
  
  export function getTimeSeriesData(states: string[], commodity: "AGO" | "PMS" | "DPK" | "LPG") {
    return petroleumData
      .filter((item) => states.includes(item.State))
      .map((item) => ({
        x: item.Period,
        y: item[commodity],
        state: item.State,
      }))
      .sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime())
  }
  
  export function getAverageByRegion() {
    const regionData = new Map()
  
    petroleumData.forEach((item) => {
      if (!regionData.has(item.Region)) {
        regionData.set(item.Region, { AGO: [], PMS: [], DPK: [], LPG: [] })
      }
  
      const region = regionData.get(item.Region)
      region.AGO.push(item.AGO)
      region.PMS.push(item.PMS)
      region.DPK.push(item.DPK)
      region.LPG.push(item.LPG)
    })
  
    const result = []
    for (const [region, data] of regionData) {
      result.push({
        region,
        AGO: data.AGO.reduce((a: number, b: number) => a + b, 0) / data.AGO.length,
        PMS: data.PMS.reduce((a: number, b: number) => a + b, 0) / data.PMS.length,
        DPK: data.DPK.reduce((a: number, b: number) => a + b, 0) / data.DPK.length,
        LPG: data.LPG.reduce((a: number, b: number) => a + b, 0) / data.LPG.length,
      })
    }
  
    return result
  }
  export const widgetOptions: WidgetOption[] = [
    {
      id: "retail-product",
      title: "Retail product",
      description: "View price quotes and track performance of a product throughout the week",
      type: "retail",
    },
    {
      id: "retail-product-news",
      title: "Retail product & news",
      description: "View price quotes, track performance and latest news of a product throughout the week",
      type: "retail-news",
    },
    {
      id: "watchlist",
      title: "Watchlist",
      description: "View price quotes and track performance of watchlist throughout the week",
      type: "watchlist",
    },
    {
      id: "watchlist-news",
      title: "Watchlist & news",
      description: "View price quotes, track performance and latest news of watchlist throughout the week",
      type: "watchlist-news",
    },
  ]
  
  export const flightData: FlightData[] = [
    { date: "24 Jan", international: 280000, domestic: 320000 },
    { date: "31 Jan", international: 250000, domestic: 280000 },
    { date: "7 Feb", international: 420000, domestic: 380000 },
    { date: "14 Feb", international: 380000, domestic: 320000 },
  ]
  
  export const depotData = {
    name: "NIPCO",
    location: "Lagos",
    currentPrice: 714.26,
    change: 0.37,
    changePercent: 0.09,
    commodities: ["PMS", "AGO", "DPK", "ICE", "LPG"],
    activeCommodity: "PMS",
  }
  
  export const sidebarItems: SidebarItem[] = [
    { id: "product-retail-price", label: "Product retail price" },
    { id: "flight-widget", label: "Flight widget" },
    { id: "depot-widget", label: "Depot widget" },
    { id: "news-widget", label: "News widget" },
    { id: "report-widget", label: "Report widget" },
    { id: "exchange-rate", label: "Exchange rate" },
  ] 
  interface Notification {
    id: string
    type: 'invitation' | 'comment' | 'mention' | 'alert' | 'report'
    user: {
      name: string
      avatar: string
      isOnline?: boolean
    }
    timestamp: string
    title: string
    content?: string
    link?: string
    isUnread: boolean
  }
  export const notifications: Notification[] = [
    {
      id: '1',
      type: 'invitation',
      user: {
        name: 'David Osapolo',
        avatar: '/assets/images/Avatar.png',
        isOnline: false,
      },
      timestamp: '2 mins ago',
      title: "Invited Aliyu Tosin to the La'organisation",
      isUnread: true,
    },
    {
      id: '2',
      type: 'comment',
      user: {
        name: 'Gideon Osama',
        avatar: '/assets/images/Avatar.png',
        isOnline: true,
      },
      timestamp: '5 mins ago',
      title: 'Commented in PMS Price Analysis',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      link: 'PMS Price Analysis',
      isUnread: false,
    },
    {
      id: '3',
      type: 'alert',
      user: {
        name: 'Price Drop Alert',
        avatar: '/assets/images/Avatar.png',
        isOnline: false,
      },
      timestamp: '30 mins ago',
      title: 'PMS Falls Below ₦500/Liter',
      content:
        'The price of Premium Motor Spirit (PMS) has dropped to ₦495 per litre. This is a 3% decrease from last week. Market analysts suggest this trend may continue due to global oil price fluctuations.',
      link: 'PMS Falls Below ₦500/Liter',
      isUnread: true,
    },
    {
      id: '4',
      type: 'mention',
      user: {
        name: 'Gideon Osama',
        avatar: '/assets/images/Avatar.png',
        isOnline: true,
      },
      timestamp: '5 mins ago',
      title: 'Mentioned you in PMS Price Analysis',
      content:
        '@john Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. What are your thoughts on the current market trends?',
      link: 'PMS Price Analysis',
      isUnread: true,
    },
    {
      id: '5',
      type: 'report',
      user: {
        name: 'Weekly Report',
        avatar: '/assets/images/Avatar.png',
        isOnline: false,
      },
      timestamp: '30 mins ago',
      title: 'PMS Market Analysis Now Available',
      content:
        'PMS Market Analysis for the week ending February 15th is now available for download. The report includes detailed price trends and market forecasts.',
      link: 'PMS Market Analysis Now Available',
      isUnread: true,
    },
    {
      id: '6',
      type: 'comment',
      user: {
        name: 'Sarah Johnson',
        avatar: '/assets/images/Avatar.png',
        isOnline: true,
      },
      timestamp: '1 hour ago',
      title: 'Commented in AGO Price Trends',
      content:
        'Great analysis! The correlation between international crude prices and local AGO pricing is very clear in your charts.',
      link: 'AGO Price Trends',
      isUnread: false,
    },
    {
      id: '7',
      type: 'alert',
      user: {
        name: 'System Alert',
        avatar: '/assets/images/Avatar.png',
        isOnline: false,
      },
      timestamp: '2 hours ago',
      title: 'DPK Price Alert Triggered',
      content:
        'DPK prices have increased by 5% in the Lagos region. Current average price is ₦1,425 per litre.',
      isUnread: true,
    },
    {
      id: '8',
      type: 'invitation',
      user: {
        name: 'Michael Chen',
        avatar: '/assets/images/Avatar.png',
        isOnline: false,
      },
      timestamp: '3 hours ago',
      title: 'Invited you to join Petroleum Traders Group',
      isUnread: false,
    },
    {
      id: '9',
      type: 'mention',
      user: {
        name: 'Alex Thompson',
        avatar: '/assets/images/Avatar.png',
        isOnline: true,
      },
      timestamp: '4 hours ago',
      title: 'Mentioned you in Market Forecast Discussion',
      content:
        '@john Your prediction about Q2 pricing was spot on! How do you see Q3 shaping up?',
      isUnread: true,
    },
    {
      id: '10',
      type: 'report',
      user: {
        name: 'Monthly Report',
        avatar: '/assets/images/Avatar.png',
        isOnline: false,
      },
      timestamp: '1 day ago',
      title: 'February Market Summary Available',
      content:
        'The comprehensive February market summary including all petroleum products is now ready for review.',
      isUnread: false,
    },
  ]