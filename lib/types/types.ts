export interface WidgetOption {
    id: string
    title: string
    description: string
    type: "retail" | "retail-news" | "watchlist" | "watchlist-news"
  }
  
  export interface FlightData {
    date: string
    international: number
    domestic: number
  }
  
  export interface SidebarItem {
    id: string
    label: string
  }
  