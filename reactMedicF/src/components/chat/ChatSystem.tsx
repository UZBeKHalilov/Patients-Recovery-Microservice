
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Search,
  User
} from 'lucide-react';

interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderRole: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'emergency';
}

interface Chat {
  id: number;
  participantId: number;
  participantName: string;
  participantRole: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

const ChatSystem = ({ currentUser }: { currentUser: any }) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chats: Chat[] = [
    {
      id: 1,
      participantId: 2,
      participantName: "Dr. Sarah Johnson",
      participantRole: "Doctor",
      lastMessage: "Your recovery is progressing well.",
      lastMessageTime: "2 hours ago",
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 2,
      participantId: 3,
      participantName: "Nurse Mary Wilson",
      participantRole: "Nurse",
      lastMessage: "Time for your medication.",
      lastMessageTime: "4 hours ago",
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 3,
      participantId: 4,
      participantName: "John Doe",
      participantRole: "Patient",
      lastMessage: "I'm feeling much better today.",
      lastMessageTime: "1 day ago",
      unreadCount: 1,
      isOnline: false
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      senderId: 2,
      senderName: "Dr. Sarah Johnson",
      senderRole: "Doctor",
      message: "Good morning! How are you feeling today?",
      timestamp: "09:00 AM",
      type: 'text'
    },
    {
      id: 2,
      senderId: currentUser.id,
      senderName: currentUser.firstName,
      senderRole: currentUser.role,
      message: "I'm feeling much better, thank you! The pain has reduced significantly.",
      timestamp: "09:15 AM",
      type: 'text'
    },
    {
      id: 3,
      senderId: 2,
      senderName: "Dr. Sarah Johnson",
      senderRole: "Doctor",
      message: "That's excellent news! Your recovery is progressing well. Keep up with the prescribed exercises.",
      timestamp: "09:20 AM",
      type: 'text'
    },
    {
      id: 4,
      senderId: currentUser.id,
      senderName: currentUser.firstName,
      senderRole: currentUser.role,
      message: "Will do! When can I expect to go home?",
      timestamp: "09:25 AM",
      type: 'text'
    },
    {
      id: 5,
      senderId: 2,
      senderName: "Dr. Sarah Johnson",
      senderRole: "Doctor",
      message: "If everything continues as expected, you should be ready for discharge by Friday. We'll monitor your progress over the next few days.",
      timestamp: "09:30 AM",
      type: 'text'
    }
  ];

  const selectedChatData = chats.find(chat => chat.id === selectedChat);
  const filteredChats = chats.filter(chat => 
    chat.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.participantRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (message.trim() && selectedChat) {
      console.log('Sending message:', message);
      // Implementation for sending message
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-[600px] flex border rounded-lg overflow-hidden">
      {/* Chat List */}
      <div className="w-1/3 border-r bg-gray-50">
        <div className="p-4 border-b bg-white">
          <h3 className="font-semibold mb-3">Messages</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto h-full">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 border-b cursor-pointer hover:bg-white transition-colors ${
                selectedChat === chat.id ? 'bg-white border-l-4 border-l-medical-primary' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-medical-primary rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-sm truncate">{chat.participantName}</h4>
                    <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                  </div>
                  <Badge variant="outline" className="text-xs mb-1">
                    {chat.participantRole}
                  </Badge>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  {chat.unreadCount > 0 && (
                    <div className="mt-1">
                      <Badge variant="default" className="text-xs">
                        {chat.unreadCount} new
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-medical-primary rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">{selectedChatData?.participantName}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {selectedChatData?.participantRole}
                    </Badge>
                    {selectedChatData?.isOnline && (
                      <span className="text-xs text-green-600">Online</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Video className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.senderId === currentUser.id
                        ? 'bg-medical-primary text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {msg.senderId !== currentUser.id && (
                      <div className="text-xs font-semibold mb-1">
                        {msg.senderName}
                      </div>
                    )}
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.senderId === currentUser.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button 
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="medical-gradient text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSystem;
