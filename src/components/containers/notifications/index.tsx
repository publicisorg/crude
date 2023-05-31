import { Notification } from "../../common/notification"
export const Notifications = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-4">
    <h1 className="text-3xl font-bold mb-4">Notificaciones</h1>
    <Notification></Notification>
    <Notification></Notification>
    <Notification></Notification>
    <Notification></Notification>
    <Notification></Notification>
    </div>
  )
}
